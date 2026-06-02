import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "katex/dist/katex.min.css";
import Link from "next/link";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MathPrep — Free AMC, MathCounts & SAT Math Practice",
  description:
    "Free practice tests and instant feedback for AMC 8, AMC 10, MathCounts, AIME, and SAT Math. 300+ problems with step-by-step explanations.",
  keywords: [
    "AMC 8 practice",
    "AMC 10 practice",
    "MathCounts practice",
    "AIME practice",
    "SAT math practice",
    "math competition problems",
    "free math practice test",
    "math olympiad prep",
  ],
  openGraph: {
    title: "MathPrep — Free AMC, MathCounts & SAT Math Practice",
    description:
      "300+ competition math problems with instant feedback and step-by-step explanations. Practice for AMC 8, AMC 10, MathCounts, AIME, and SAT Math — free.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "MathPrep — Free Math Competition Practice",
    description:
      "300+ AMC, MathCounts, AIME, and SAT Math problems with instant feedback. Free.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
              MathPrep
            </Link>
            <div className="flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/quiz" className="hover:text-blue-600">Practice</Link>
              <Link href="/lessons" className="hover:text-blue-600">Lessons</Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-400">
          MathPrep © 2025 — Free math competition practice
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
