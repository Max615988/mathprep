import Link from "next/link";
import { lessons } from "@/data/lessons";

const topicColors: Record<string, string> = {
  Arithmetic: "bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700",
  Algebra: "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700",
  Geometry: "bg-green-50 border-green-200 hover:bg-green-100 text-green-700",
  "Number Theory": "bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700",
  Combinatorics: "bg-pink-50 border-pink-200 hover:bg-pink-100 text-pink-700",
  Statistics: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-700",
};

const badgeColors: Record<string, string> = {
  Arithmetic: "bg-orange-100 text-orange-700",
  Algebra: "bg-blue-100 text-blue-700",
  Geometry: "bg-green-100 text-green-700",
  "Number Theory": "bg-purple-100 text-purple-700",
  Combinatorics: "bg-pink-100 text-pink-700",
  Statistics: "bg-yellow-100 text-yellow-700",
};

const topicOrder = ["Arithmetic", "Algebra", "Geometry", "Number Theory", "Combinatorics", "Statistics"];

export const metadata = {
  title: "Math Lessons — MathPrep",
  description: "Short, clear lessons on competition math concepts: algebra, geometry, number theory, combinatorics, and more.",
};

export default function LessonsPage() {
  const grouped: Record<string, typeof lessons> = {};
  for (const topic of topicOrder) {
    grouped[topic] = lessons.filter((l) => l.topic === topic);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Math Lessons</h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Short, focused lessons on the concepts that show up most in competition math.
          Each lesson includes examples and key formulas.
        </p>
      </div>

      <div className="space-y-12">
        {topicOrder.map((topic) => {
          const topicLessons = grouped[topic];
          if (!topicLessons?.length) return null;
          const main = topicLessons.find((l) => !l.parentSlug);
          const subtopics = topicLessons.filter((l) => l.parentSlug);
          const color = topicColors[topic] ?? "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700";
          const badge = badgeColors[topic] ?? "bg-gray-100 text-gray-700";

          return (
            <div key={topic}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge}`}>{topic}</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {main && (
                  <Link
                    href={`/lessons/${main.slug}`}
                    className={`border rounded-xl p-5 transition-colors ${color}`}
                  >
                    <p className="font-semibold text-gray-900 mb-1">{main.title}</p>
                    <p className="text-sm text-gray-500 leading-snug">{main.description}</p>
                  </Link>
                )}
                {subtopics.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/lessons/${lesson.slug}`}
                    className="border border-gray-200 bg-white hover:bg-gray-50 rounded-xl p-5 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{lesson.title}</p>
                      <span className="text-xs text-gray-400">↳ {topic}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-snug">{lesson.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
