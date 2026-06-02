import { notFound } from "next/navigation";
import Link from "next/link";
import { lessons, getLessonBySlug } from "@/data/lessons";
import MathText from "@/components/MathText";
import LessonBody from "@/components/LessonBody";

export async function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — MathPrep Lessons`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  if (!lesson) notFound();

  const parent = lesson.parentSlug ? getLessonBySlug(lesson.parentSlug) : null;
  const subtopics = lessons.filter((l) => l.parentSlug === lesson.slug);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4 flex-wrap">
          <Link href="/lessons" className="hover:text-blue-600 transition-colors">Lessons</Link>
          {parent && (
            <>
              <span>›</span>
              <Link href={`/lessons/${parent.slug}`} className="hover:text-blue-600 transition-colors">
                {parent.title}
              </Link>
            </>
          )}
          <span>›</span>
          <span className="text-gray-600">{lesson.title}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">{lesson.title}</h1>
        <p className="text-gray-500 text-base leading-relaxed">{lesson.description}</p>
      </div>

      <div className="space-y-10">
        {lesson.sections.map((section, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{section.heading}</h2>
            <div className="text-sm">
              <LessonBody text={section.body} />
            </div>

            {section.examples && section.examples.length > 0 && (
              <div className="mt-5 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Examples</p>
                {section.examples.map((ex, j) => (
                  <div key={j} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      <MathText text={ex.problem} />
                    </p>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Solution</p>
                      <p className="text-sm text-gray-700">
                        <MathText text={ex.solution} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {subtopics.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Related Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subtopics.map((sub) => (
              <Link
                key={sub.slug}
                href={`/lessons/${sub.slug}`}
                className="border border-gray-200 bg-white hover:bg-gray-50 rounded-xl p-4 transition-colors"
              >
                <p className="font-semibold text-gray-900 mb-1">{sub.title}</p>
                <p className="text-sm text-gray-500">{sub.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between gap-4 flex-wrap">
        <Link href="/lessons" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          ← All Lessons
        </Link>
        <Link
          href={`/quiz?topic=${encodeURIComponent(lesson.topic)}&mode=practice`}
          className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Practice {lesson.topic} Problems →
        </Link>
      </div>
    </div>
  );
}
