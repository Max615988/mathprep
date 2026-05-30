"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import type { Question } from "@/types/question";
import MathText from "@/components/MathText";

const CHOICES = ["A", "B", "C", "D", "E"];

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const competition = searchParams.get("competition") || "";
  const topic = searchParams.get("topic") || "";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<{ question: Question; chosen: string; correct: boolean }[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    fetch("/api/questions?" + new URLSearchParams({ competition, topic }))
      .then((r) => r.json())
      .then((data: Question[]) => {
        setQuestions(data);
        setTimeLeft(data.length * 60);
      });
  }, [competition, topic]);

  const finish = useCallback(() => {
    const params = new URLSearchParams();
    params.set("answers", JSON.stringify(answers));
    router.push("/results?" + params.toString());
  }, [answers, router]);

  useEffect(() => {
    if (!started || timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(t); finish(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, timeLeft, finish]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const handleSelect = (choice: string) => {
    if (revealed) return;
    setSelected(choice);
  };

  const handleReveal = () => {
    if (!selected) return;
    setRevealed(true);
  };

  const handleNext = () => {
    if (!selected) return;
    const q = questions[current];
    const correct = selected === q.answer;
    const newAnswers = [...answers, { question: q, chosen: selected, correct }];
    setAnswers(newAnswers);

    if (current + 1 >= questions.length) {
      const params = new URLSearchParams();
      params.set("answers", JSON.stringify(newAnswers));
      router.push("/results?" + params.toString());
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-gray-400">
        Loading questions...
      </div>
    );
  }

  if (!started) {
    const label = competition || topic || "All Topics";
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{label} Practice Test</h1>
        <p className="text-gray-500 mb-2">{questions.length} questions</p>
        <p className="text-gray-500 mb-8">You&apos;ll have {formatTime(timeLeft)} to complete the test.</p>
        <button
          onClick={() => setStarted(true)}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Test
        </button>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <span>Question {current + 1} of {questions.length}</span>
        <span className={`font-mono font-semibold ${timeLeft < 60 ? "text-red-500" : "text-gray-700"}`}>
          {formatTime(timeLeft)}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-8">
        <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mb-2 flex gap-2 text-xs">
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{q.competition}</span>
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{q.topic}</span>
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{q.difficulty}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <p className="text-gray-900 text-base leading-relaxed"><MathText text={q.question} /></p>
      </div>

      <div className="space-y-3 mb-6">
        {q.choices.map((choice, i) => {
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
              <span className="text-gray-800"><MathText text={choice} /></span>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-sm text-gray-700">
          <p className="font-semibold text-blue-700 mb-1">Explanation</p>
          <p><MathText text={q.explanation} /></p>
        </div>
      )}

      <div className="flex gap-3">
        {!revealed ? (
          <button
            onClick={handleReveal}
            disabled={!selected}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Show Answer
          </button>
        ) : null}
        <button
          onClick={handleNext}
          disabled={!selected}
          className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {current + 1 >= questions.length ? "Finish" : "Next Question"}
        </button>
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
