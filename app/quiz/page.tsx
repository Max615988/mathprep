"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import type { Question } from "@/types/question";
import MathText from "@/components/MathText";
import { topicToSlug } from "@/data/lessons";

const CHOICES = ["A", "B", "C", "D", "E"];

type Answer = { question: Question; chosen: string; correct: boolean };

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const competition = searchParams.get("competition") || "";
  const topic = searchParams.get("topic") || "";
  const isPractice = searchParams.get("mode") !== "test";
  const answerMode = (searchParams.get("answerMode") || "multiple-choice") as "multiple-choice" | "typing";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);

  // Retry mechanic
  const [attemptCount, setAttemptCount] = useState(0);
  const [wrongOnFirstAttempt, setWrongOnFirstAttempt] = useState(false);

  // Practice-mode unlimited session tracking
  const [sessionAnswers, setSessionAnswers] = useState<Answer[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  // AI follow-up
  const [followUpInput, setFollowUpInput] = useState("");
  const [followUpAnswer, setFollowUpAnswer] = useState<string | null>(null);
  const [followUpLoading, setFollowUpLoading] = useState(false);

  useEffect(() => {
    fetch("/api/questions?" + new URLSearchParams({ competition, topic }))
      .then((r) => r.json())
      .then((data: Question[]) => {
        setQuestions(data);
        setTimeLeft(data.length * 60);
      });
  }, [competition, topic]);

  const finish = useCallback((finalAnswers: Answer[]) => {
    const params = new URLSearchParams();
    params.set("answers", JSON.stringify(finalAnswers));
    router.push("/results?" + params.toString());
  }, [router]);

  // Timer (test mode only)
  useEffect(() => {
    if (isPractice || !started || timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(t); finish(answers); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [isPractice, started, timeLeft, finish, answers]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const fetchMoreQuestions = () => {
    setLoadingMore(true);
    fetch("/api/questions?" + new URLSearchParams({ competition, topic }))
      .then((r) => r.json())
      .then((data: Question[]) => {
        setQuestions(data);
        setCurrent(0);
        setSelected(null);
        setRevealed(false);
        setLoadingMore(false);
      });
  };

  const handleSelect = (choice: string) => {
    if (revealed) return;
    setSelected(choice);
  };

  const matchTypedAnswer = (typed: string, q: Question): string | null => {
    if (!typed.trim()) return null;
    const cleanTyped = typed.trim().toLowerCase();
    
    // Try to match against the answer choices
    const answerIndex = CHOICES.indexOf(q.answer);
    if (answerIndex >= 0) {
      const correctChoice = q.choices[answerIndex];
      const cleanChoice = correctChoice.toLowerCase();
      
      // Direct match
      if (cleanTyped === cleanChoice) return q.answer;
      
      // Match just the letter (A, B, C, etc.)
      if (cleanTyped === q.answer.toLowerCase()) return q.answer;
      
      // Partial match (if typed answer is contained in the choice)
      if (cleanChoice.includes(cleanTyped) || cleanTyped.includes(cleanChoice)) return q.answer;
    }
    
    return null;
  };

  const handleReveal = () => {
    if (!selected) return;
    setRevealed(true);
  };

  const handleNext = () => {
    const answerToCheck = answerMode === "multiple-choice" ? selected : matchTypedAnswer(typedAnswer, questions[current]);
    if (!answerToCheck) return;
    
    const q = questions[current];
    const correct = answerToCheck === q.answer;

    // If wrong answer
    if (!correct) {
      // First wrong attempt: show they got it wrong and allow retry
      if (attemptCount === 0) {
        setWrongOnFirstAttempt(true);
        setAttemptCount(1);
        setRevealed(true);
        return;
      }
      // Second wrong attempt: show explanation and move on
      else {
        setWrongOnFirstAttempt(false);
        const newAnswers: Answer[] = [...answers, { question: q, chosen: answerToCheck, correct: false }];
        setFollowUpInput("");
        setFollowUpAnswer(null);
        
        if (current + 1 >= questions.length) {
          if (isPractice) {
            setSessionAnswers((prev) => [...prev, ...newAnswers]);
            setAnswers([]);
            setTypedAnswer("");
            setAttemptCount(0);
            setWrongOnFirstAttempt(false);
            fetchMoreQuestions();
          } else {
            finish(newAnswers);
          }
        } else {
          setAnswers(newAnswers);
          setCurrent((c) => c + 1);
          setSelected(null);
          setTypedAnswer("");
          setRevealed(false);
          setAttemptCount(0);
          setWrongOnFirstAttempt(false);
        }
        return;
      }
    }

    // Correct answer: record and move on
    const newAnswers: Answer[] = [...answers, { question: q, chosen: answerToCheck, correct: true }];
    setWrongOnFirstAttempt(false);
    setFollowUpInput("");
    setFollowUpAnswer(null);

    if (current + 1 >= questions.length) {
      if (isPractice) {
        setSessionAnswers((prev) => [...prev, ...newAnswers]);
        setAnswers([]);
        setTypedAnswer("");
        setAttemptCount(0);
        fetchMoreQuestions();
      } else {
        finish(newAnswers);
      }
    } else {
      setAnswers(newAnswers);
      setCurrent((c) => c + 1);
      setSelected(null);
      setTypedAnswer("");
      setRevealed(false);
      setAttemptCount(0);
    }
  };

  const handleFollowUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!followUpInput.trim() || followUpLoading) return;
    const q = questions[current];
    setFollowUpLoading(true);
    setFollowUpAnswer("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.question,
          explanation: q.explanation,
          topic: q.topic,
          userQuestion: followUpInput,
        }),
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setFollowUpAnswer(full);
      }
    } finally {
      setFollowUpLoading(false);
    }
  };

  const handleEndSession = () => {
    finish([...sessionAnswers, ...answers]);
  };

  const allCorrect = sessionAnswers.filter((a) => a.correct).length +
    answers.filter((a) => a.correct).length;
  const allTotal = sessionAnswers.length + answers.length;

  if (questions.length === 0 || loadingMore) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-gray-400">
        {loadingMore ? "Loading more questions…" : "Loading questions…"}
      </div>
    );
  }

  if (!started) {
    const label = competition || topic || "All Topics";
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isPractice ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
            {isPractice ? "Practice Mode" : "Test Mode"}
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${answerMode === "multiple-choice" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}>
            {answerMode === "multiple-choice" ? "Multiple Choice" : "Typing Mode"}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{label}</h1>
        <p className="text-gray-500 mb-2">{questions.length} questions per round</p>
        {isPractice ? (
          <p className="text-gray-500 mb-8">Instant feedback after each answer. Unlimited questions — keep going as long as you want.</p>
        ) : (
          <p className="text-gray-500 mb-8">You&apos;ll have {formatTime(timeLeft)} to complete the test.</p>
        )}
        <button
          onClick={() => setStarted(true)}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isPractice ? "Start Practice" : "Start Test"}
        </button>
      </div>
    );
  }

  const q = questions[current];
  const progress = (current / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <span>Question {current + 1} of {questions.length}</span>
        {isPractice ? (
          <div className="flex items-center gap-2">
            {allTotal > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {allCorrect}/{allTotal} correct
              </span>
            )}
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Practice</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${answerMode === "multiple-choice" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}>
              {answerMode === "multiple-choice" ? "MC" : "Type"}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className={`font-mono font-semibold ${timeLeft < 60 ? "text-red-500" : "text-gray-700"}`}>
              {formatTime(timeLeft)}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${answerMode === "multiple-choice" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"}`}>
              {answerMode === "multiple-choice" ? "MC" : "Type"}
            </span>
          </div>
        )}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
        <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mb-2 flex flex-wrap gap-2 text-xs">
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{q.competition}</span>
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{q.topic}</span>
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{q.difficulty}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <p className="text-gray-900 text-base leading-relaxed mb-4"><MathText text={q.question} /></p>
        {q.image && (
          <div className="flex justify-center">
            <img src={q.image} alt="Problem diagram" className="max-w-xs w-full rounded-lg border border-gray-200 bg-white p-2" />
          </div>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {answerMode === "multiple-choice" ? (
          // Multiple choice mode
          q.choices.map((choice, i) => {
            const letter = CHOICES[i];
            const isSelected = selected === letter;
            const isCorrect = letter === q.answer;
            let style = "border-gray-200 bg-white hover:bg-gray-50";
            if (revealed) {
              if (isCorrect) style = "border-green-400 bg-green-50";
              else if (isSelected && !isCorrect) style = "border-red-400 bg-red-50";
            } else if (isSelected) {
              style = "border-blue-400 bg-blue-50";
            }
            return (
              <button
                key={letter}
                onClick={() => handleSelect(letter)}
                className={`w-full text-left border rounded-lg px-4 py-3 transition-colors flex items-center gap-3 ${style}`}
              >
                <span className="font-semibold text-gray-500 w-5 shrink-0">{letter}.</span>
                <span className="text-gray-800 flex-1"><MathText text={choice} /></span>
                {revealed && isCorrect && <span className="text-green-600 font-bold text-sm shrink-0">✓</span>}
                {revealed && isSelected && !isCorrect && <span className="text-red-500 font-bold text-sm shrink-0">✗</span>}
              </button>
            );
          })
        ) : (
          // Typing mode
          <div className="space-y-3">
            <textarea
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey && !revealed && matchTypedAnswer(typedAnswer, q)) {
                  setRevealed(true);
                }
              }}
              placeholder="Type your answer here (you can match any of the choices)"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              rows={3}
            />
            {typedAnswer.trim() && revealed && (
              <div className={`border rounded-lg px-4 py-3 ${matchTypedAnswer(typedAnswer, q) === q.answer ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800"><MathText text={`Your answer: ${typedAnswer}`} /></span>
                  {matchTypedAnswer(typedAnswer, q) === q.answer ? (
                    <span className="text-green-600 font-bold text-sm">✓</span>
                  ) : (
                    <span className="text-red-500 font-bold text-sm">✗</span>
                  )}
                </div>
              </div>
            )}
            {typedAnswer.trim() && !revealed && (
              <div className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                Correct answer: <span className="font-semibold"><MathText text={q.choices[CHOICES.indexOf(q.answer)]} /></span>
              </div>
            )}
          </div>
        )}
      </div>

      {revealed && (
        <div className={`border rounded-xl p-4 mb-6 text-sm text-gray-700 ${wrongOnFirstAttempt ? "bg-yellow-50 border-yellow-200" : (selected !== q.answer && attemptCount > 0) ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"}`}>
          {wrongOnFirstAttempt ? (
            // First wrong attempt: show retry message only
            <p className="font-bold text-base text-yellow-700">
              You got it wrong. Try again!
            </p>
          ) : (
            <>
              {/* Second attempt or correct answer */}
              <p className={`font-bold text-base mb-2 ${selected === q.answer ? "text-green-700" : "text-red-600"}`}>
                {selected === q.answer ? "Correct!" : `Incorrect — the answer is ${q.answer}`}
              </p>
              <p className="font-semibold text-blue-700 mb-1">Explanation</p>
              <p><MathText text={q.explanation} /></p>
              {topicToSlug[q.topic] && (
                <Link
                  href={`/lessons/${topicToSlug[q.topic]}`}
                  className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Learn {q.topic} →
                </Link>
              )}

              <form onSubmit={handleFollowUp} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={followUpInput}
                  onChange={(e) => setFollowUpInput(e.target.value)}
                  placeholder="Ask a follow-up question..."
                  disabled={followUpLoading}
                  className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 text-gray-800 placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={!followUpInput.trim() || followUpLoading}
                  className="px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                >
                  {followUpLoading ? "…" : "Ask"}
                </button>
              </form>

              {followUpAnswer !== null && (
                <div className="mt-3 text-xs text-gray-700 bg-white bg-opacity-70 rounded-lg p-3 leading-relaxed">
                  <p className="font-semibold text-purple-700 mb-1">AI Tutor</p>
                  <MathText text={followUpAnswer || "…"} />
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="flex gap-3">
        {!revealed && !isPractice && (
          <button
            onClick={() => setRevealed(true)}
            disabled={answerMode === "multiple-choice" ? !selected : !typedAnswer.trim()}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Show Answer
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={answerMode === "multiple-choice" ? !selected : !matchTypedAnswer(typedAnswer, q)}
          className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {wrongOnFirstAttempt ? "Try Again" : isPractice ? "Next" : current + 1 >= questions.length ? "Finish" : "Next Question"}
        </button>
        {isPractice && allTotal > 0 && (
          <button
            onClick={handleEndSession}
            className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            End Session
          </button>
        )}
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
      <QuizContent />
    </Suspense>
  );
}
