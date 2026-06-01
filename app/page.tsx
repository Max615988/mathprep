"use client";

import Link from "next/link";
import { useState } from "react";

const competitions = [
  {
    name: "AMC 8",
    description: "Grades 6–8 · 25 questions · 40 minutes",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    badge: "bg-blue-100 text-blue-700",
    slug: "AMC 8",
  },
  {
    name: "AMC 10/12",
    description: "Grades 10–12 · 30 questions · 75 minutes",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    badge: "bg-purple-100 text-purple-700",
    slug: "AMC 10",
  },
  {
    name: "MathCounts",
    description: "Middle school · Sprint, Target & Team rounds",
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    badge: "bg-green-100 text-green-700",
    slug: "MathCounts",
  },
  {
    name: "AIME",
    description: "Invitation only · 15 questions · 3 hours",
    color: "bg-red-50 border-red-200 hover:bg-red-100",
    badge: "bg-red-100 text-red-700",
    slug: "AIME",
  },
  {
    name: "SAT Math",
    description: "College entrance · 44 questions · 70 minutes",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    badge: "bg-orange-100 text-orange-700",
    slug: "SAT",
  },
];

const topics = ["Algebra", "Geometry", "Number Theory", "Combinatorics", "Arithmetic", "Statistics"];

export default function Home() {
  const [mode, setMode] = useState<"practice" | "test">("practice");

  const href = (params: Record<string, string>) => {
    const p = new URLSearchParams({ ...params, mode });
    return `/quiz?${p.toString()}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Math Competition Practice
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Free practice tests for AMC, MathCounts, AIME, and SAT Math.
          Study smarter with instant feedback and explanations.
        </p>

        <div className="inline-flex items-center mt-6 mb-4 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setMode("practice")}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${
              mode === "practice"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Practice Mode
          </button>
          <button
            onClick={() => setMode("test")}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${
              mode === "test"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Test Mode
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          {mode === "practice"
            ? "Instant feedback after each answer · No timer"
            : "Timed session · Review all answers at the end"}
        </p>

        <Link
          href={href({})}
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Practicing
        </Link>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Choose a Competition</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {competitions.map((c) => (
          <Link
            key={c.name}
            href={href({ competition: c.slug })}
            className={`border rounded-xl p-5 transition-colors cursor-pointer ${c.color}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>
                {c.name}
              </span>
            </div>
            <p className="text-sm text-gray-600">{c.description}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Browse by Topic</h2>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <Link
            key={topic}
            href={href({ topic })}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {topic}
          </Link>
        ))}
      </div>
    </div>
  );
}
