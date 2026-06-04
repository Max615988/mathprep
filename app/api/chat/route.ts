import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic();

const SYSTEM = `You are a math tutor assistant embedded in MathPrep, a competition math practice site (AMC 8, AMC 10/12, MathCounts, AIME, SAT Math).

A student just answered a problem and read the explanation. They have a follow-up question.

Guidelines:
- Answer concisely — aim for 2–4 sentences, 100 words max
- Use $...$ for inline math and $$...$$ for block/display math
- Be encouraging and clear
- Stay focused on math; politely decline unrelated questions
- If the student is confused about a step, walk through it carefully`;

export async function POST(req: NextRequest) {
  const { question, explanation, topic, userQuestion } = await req.json();

  const userContent = `Problem topic: ${topic}

Problem: ${question}

Explanation the student saw: ${explanation}

Student's follow-up question: ${userQuestion}`;

  const stream = client.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    system: SYSTEM,
    messages: [{ role: "user", content: userContent }],
  });

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
