"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import type { Question } from "@/types/question";
import MathText from "@/components/MathText";

type Answer = { question: Question; chosen: string; correct: boolean };

const CHOICES = ["A", "B", "C", "D", "E"];

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = searchParams.get("answers");
  const answers: Answer[] = raw ? JSON.parse(raw) : [];
  const score = answers.filter((a) => a.correct).length;
  const total = answers.length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const grade =
    pct >= 90 ? { label: "Excellent!", color: "text-green-600" }
    : pct >= 70 ? { label: "Good Job!", color: "text-blue-600" }
    : pct >= 50 ? { label: "Keep Practicing", color: "text-yellow-600" }
    : { label: "Keep Going!", color: "text-red-600" };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center mb-8">
        <p className="text-gray-500 text-sm mb-1">Your Score</p>
        <p className="text-6xl font-bold text-gray-900 mb-1">{score}<span className="text-3xl text-gray-400">/{total}</span></p>
        <p className={`text-2xl font-semibold mt-2 ${grade.color}`}>{grade.label}</p>
        <p className="text-gray-400 mt-1">{pct}% correct</p>

        <div className="w-full bg-gray-100 rounded-full h-3 mt-6">
          <div
            className={`h-3 rounded-full transition-all ${pct >= 70 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={() => router.push("/quiz")}
          className="flex-1 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Back to Home
        </button>
      </div>

      <h2 className="text-lg font-semibold text-gray-700 mb-4">Review Your Answers</h2>
      <div className="space-y-5">
        {answers.map((a, i) => (
          <div key={i} className={`border rounded-xl p-5 ${a.correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
            <div className="flex items-start justify-between gap-2 mb-3">
              <p className="text-sm text-gray-800 leading-relaxed"><MathText text={a.question.question} /></p>
              <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${a.correct ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                {a.correct ? "✓" : "✗"}
              </span>
            </div>
            {a.question.source === "ai" && (
              <span className="inline-block mb-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">AI Generated</span>
            )}
            <div className="space-y-1 mb-3">
              {a.question.choices.map((choice, ci) => {
                const letter = CHOICES[ci];
                const isCorrect = letter === a.question.answer;
                const isChosen = letter === a.chosen;
                let style = "text-gray-500";
                if (isCorrect) style = "text-green-700 font-semibold";
                else if (isChosen && !isCorrect) style = "text-red-600 line-through";
                return (
                  <p key={letter} className={`text-xs ${style}`}>
                    {letter}. <MathText text={choice} />
                  </p>
                );
              })}
            </div>
            <div className="bg-white bg-opacity-60 rounded-lg p-3 text-xs text-gray-600">
              <span className="font-semibold text-gray-700">Explanation: </span>
              <MathText text={a.question.explanation} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
