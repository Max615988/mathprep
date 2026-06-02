"use client";

import MathText from "./MathText";

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let key = 0;
  let remaining = text;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldStart = remaining.indexOf("**");
    if (boldStart !== -1) {
      const boldEnd = remaining.indexOf("**", boldStart + 2);
      if (boldEnd !== -1) {
        if (boldStart > 0) {
          parts.push(<MathText key={key++} text={remaining.slice(0, boldStart)} />);
        }
        parts.push(
          <strong key={key++} className="font-semibold text-gray-800">
            <MathText text={remaining.slice(boldStart + 2, boldEnd)} />
          </strong>
        );
        remaining = remaining.slice(boldEnd + 2);
        continue;
      }
    }
    parts.push(<MathText key={key++} text={remaining} />);
    break;
  }
  return parts;
}

function renderTable(lines: string[]): React.ReactNode {
  const rows = lines.map((l) =>
    l.split("|").map((c) => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1)
  );
  const [header, , ...body] = rows;
  return (
    <div className="overflow-x-auto my-2">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th key={i} className="text-left px-3 py-2 bg-gray-100 border border-gray-200 font-semibold text-gray-700">
                <MathText text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 border border-gray-200 text-gray-700">
                  <MathText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LessonBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);

  return (
    <div className="space-y-3">
      {paragraphs.map((para, i) => {
        const lines = para.split("\n");

        // Markdown table: first line starts with |
        if (lines[0].startsWith("|")) {
          return <div key={i}>{renderTable(lines)}</div>;
        }

        // Bullet list
        if (lines.every((l) => l.startsWith("- ") || l.startsWith("* "))) {
          return (
            <ul key={i} className="list-disc list-inside space-y-1 text-gray-700">
              {lines.map((l, j) => (
                <li key={j}>{parseInline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }

        // Block math: $$...$$
        if (para.trimStart().startsWith("$$") && para.trimEnd().endsWith("$$")) {
          return (
            <p key={i} className="text-gray-700">
              <MathText text={para} />
            </p>
          );
        }

        // Regular paragraph (may contain inline math and bold)
        return (
          <p key={i} className="text-gray-700 leading-relaxed">
            {lines.map((line, j) => (
              <span key={j}>
                {parseInline(line)}
                {j < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
