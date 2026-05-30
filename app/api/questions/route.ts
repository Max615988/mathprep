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
  let questions: Question[] = JSON.parse(raw);

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

  const selected = shuffle(questions).slice(0, 10);
  return NextResponse.json(selected);
}
