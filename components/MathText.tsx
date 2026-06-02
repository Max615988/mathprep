"use client";

import { InlineMath, BlockMath } from "react-katex";

const RawMath = ({ src }: { src: string }) => (
  <span className="font-mono text-sm text-orange-600">{src}</span>
);

export default function MathText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const blockStart = remaining.indexOf("$$");
    const inlineStart = remaining.indexOf("$");

    // ── Block math: $$...$$  ────────────────────────────────────────────────
    if (blockStart === 0) {
      const end = remaining.indexOf("$$", 2);
      if (end !== -1) {
        const math = remaining.slice(2, end);
        parts.push(
          <BlockMath key={key++} math={math}
            renderError={() => <RawMath src={`$$${math}$$`} />}
          />
        );
        remaining = remaining.slice(end + 2);
        continue;
      }
    }

    // ── Inline math: $...$ ──────────────────────────────────────────────────
    if (inlineStart === 0) {
      // Currency heuristic: $DIGITS where the character after the number is
      // whitespace, punctuation, or end-of-string — NOT a math operator.
      // e.g. "$500 for a bike" → currency; "$400=10\times40$" → math
      const currMatch = remaining.match(/^\$[\d,]+(\.\d+)?/);
      if (currMatch) {
        const charAfter = remaining[currMatch[0].length] ?? "";
        const isMathContext = /[=+\-*/^_\\{}<>%!$]/.test(charAfter);
        if (!isMathContext) {
          parts.push(<span key={key++}>{currMatch[0]}</span>);
          remaining = remaining.slice(currMatch[0].length);
          continue;
        }
      }

      const end = remaining.indexOf("$", 1);
      if (end !== -1) {
        const math = remaining.slice(1, end);
        parts.push(
          <InlineMath key={key++} math={math}
            renderError={() => <RawMath src={`$${math}$`} />}
          />
        );
        remaining = remaining.slice(end + 1);
        continue;
      }
    }

    // ── Plain text up to next $ ─────────────────────────────────────────────
    const next = inlineStart > 0 ? inlineStart : remaining.length;
    parts.push(<span key={key++}>{remaining.slice(0, next)}</span>);
    remaining = remaining.slice(next);
  }

  return <>{parts}</>;
}
