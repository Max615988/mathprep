import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import type { Question } from "@/types/question";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const competition = searchParams.get("competition") || "";
  const topic = searchParams.get("topic") || "";

  const raw = readFileSync(join(process.cwd(), "data", "questions.json"), "utf-8");
  let questions: Question[] = (JSON.parse(raw) as Omit<Question, "source">[]).map((q) => ({
    ...q,
    source: q.id <= 80 ? ("ai" as const) : ("real" as const),
  }));

  if (competition) {
    questions = questions.filter((q) =>
      q.competition.toLowerCase().includes(competition.toLowerCase())
    );
  }
  if (topic) {
    questions = questions.filter((q) =>
      q.topic.toLowerCase() === topic.toLowerCase()
    );
  }

  const hard = shuffle(questions.filter((q) => q.difficulty === "hard"));
  const medium = shuffle(questions.filter((q) => q.difficulty === "medium"));
  const easy = shuffle(questions.filter((q) => q.difficulty === "easy"));

  // Weight toward harder questions: 5 hard, 3 medium, 2 easy (fill gaps if needed)
  const selected = shuffle([
    ...hard.slice(0, 5),
    ...medium.slice(0, 3),
    ...easy.slice(0, 2),
    ...hard.slice(5),
    ...medium.slice(3),
    ...easy.slice(2),
  ]).slice(0, 10);

  return NextResponse.json(selected);
}
