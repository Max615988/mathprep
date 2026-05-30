"use client";

import { InlineMath, BlockMath } from "react-katex";

// Splits a string on $...$ (inline) and $$...$$ (block) delimiters and renders each part.
export default function MathText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const blockStart = remaining.indexOf("$$");
    const inlineStart = remaining.indexOf("$");

    if (blockStart === 0) {
      const end = remaining.indexOf("$$", 2);
      if (end !== -1) {
        const math = remaining.slice(2, end);
        parts.push(<BlockMath key={key++} math={math} />);
        remaining = remaining.slice(end + 2);
        continue;
      }
    }

    if (inlineStart === 0) {
      const end = remaining.indexOf("$", 1);
      if (end !== -1) {
        const math = remaining.slice(1, end);
        parts.push(<InlineMath key={key++} math={math} />);
        remaining = remaining.slice(end + 1);
        continue;
      }
    }

    // Find the next $ and emit text before it
    const next = inlineStart > 0 ? inlineStart : remaining.length;
    parts.push(<span key={key++}>{remaining.slice(0, next)}</span>);
    remaining = remaining.slice(next);
  }

  return <>{parts}</>;
}
