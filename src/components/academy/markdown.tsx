"use client";

import React from "react";

/**
 * Lightweight markdown renderer — handles headings, bold, italic, inline code,
 * lists, paragraphs, tables, and triple-tilde code blocks (used in our seed).
 * Avoids external dependencies to keep the bundle small.
 */

export function Markdown({ content }: { content: string }) {
  const blocks = parseBlocks(content);
  return (
    <div className="space-y-3 leading-relaxed text-foreground/90">
      {blocks.map((b, i) => renderBlock(b, i))}
    </div>
  );
}

type Block =
  | { type: "h1" | "h2" | "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; lang?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "hr" };

function parseBlocks(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Code block — triple tilde
    if (line.trim().startsWith("~~~")) {
      const lang = line.trim().slice(3).trim() || undefined;
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("~~~")) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing ~~~
      blocks.push({ type: "code", lang, text: buf.join("\n") });
      continue;
    }
    // Headings
    const h = /^(#{1,3})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      blocks.push({
        type: level === 1 ? "h1" : level === 2 ? "h2" : "h3",
        text: h[2],
      });
      i++;
      continue;
    }
    // Horizontal rule
    if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }
    // Table (line | line | line)
    if (line.includes("|") && i + 1 < lines.length && /^\s*[-:|\s]+\s*$/.test(lines[i + 1]) && lines[i + 1].includes("|")) {
      const headers = line.split("|").map((s) => s.trim()).filter(Boolean);
      i += 2; // skip header + separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(lines[i].split("|").map((s) => s.trim()).filter(Boolean));
        i++;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }
    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }
    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }
    // Paragraph (collect until blank)
    const buf: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3})\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !lines[i].trim().startsWith("~~~") &&
      !/^---+$/.test(lines[i].trim())
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ type: "p", text: buf.join(" ") });
  }
  return blocks;
}

function renderBlock(b: Block, key: number): React.ReactNode {
  switch (b.type) {
    case "h1":
      return (
        <h2 key={key} className="text-2xl font-bold mt-4 mb-2 text-foreground">
          {renderInline(b.text)}
        </h2>
      );
    case "h2":
      return (
        <h3 key={key} className="text-xl font-semibold mt-3 mb-1 text-foreground">
          {renderInline(b.text)}
        </h3>
      );
    case "h3":
      return (
        <h4 key={key} className="text-lg font-semibold mt-2 mb-1 text-foreground">
          {renderInline(b.text)}
        </h4>
      );
    case "p":
      return (
        <p key={key} className="text-foreground/90">
          {renderInline(b.text)}
        </p>
      );
    case "ul":
      return (
        <ul key={key} className="list-disc pl-6 space-y-1">
          {b.items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key} className="list-decimal pl-6 space-y-1">
          {b.items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre
          key={key}
          className="bg-muted text-foreground p-3 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap"
        >
          <code>{b.text}</code>
        </pre>
      );
    case "table":
      return (
        <div key={key} className="overflow-x-auto">
          <table className="min-w-full text-sm border border-border rounded">
            <thead className="bg-muted">
              <tr>
                {b.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold border-b border-border">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-border/60">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "hr":
      return <hr key={key} className="my-4 border-border" />;
  }
}

/** Render inline markdown: bold (**), italic (*), inline code (`), links [text](url) */
function renderInline(text: string): React.ReactNode {
  const tokens: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < text.length) {
    // Bold
    if (text[i] === "*" && text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        tokens.push(
          <strong key={key++} className="font-semibold text-foreground">
            {text.slice(i + 2, end)}
          </strong>
        );
        i = end + 2;
        continue;
      }
    }
    // Inline code (handle escaped backtick \`)
    if (text[i] === "`" || (text[i] === "\\" && text[i + 1] === "`")) {
      const startChar = text[i] === "\\" ? "\\`" : "`";
      const startIdx = i + (text[i] === "\\" ? 2 : 1);
      const end = findUnescapedBacktick(text, startIdx);
      if (end !== -1) {
        tokens.push(
          <code
            key={key++}
            className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
          >
            {text.slice(startIdx, end)}
          </code>
        );
        i = end + 1;
        continue;
      }
    }
    // Link [text](url)
    if (text[i] === "[") {
      const close = text.indexOf("]", i);
      if (close !== -1 && text[close + 1] === "(") {
        const end = text.indexOf(")", close + 2);
        if (end !== -1) {
          const label = text.slice(i + 1, close);
          const url = text.slice(close + 2, end);
          tokens.push(
            <a
              key={key++}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              {label}
            </a>
          );
          i = end + 1;
          continue;
        }
      }
    }
    // Plain text — accumulate until next special char
    let j = i;
    while (
      j < text.length &&
      !(text[j] === "*" && text[j + 1] === "*") &&
      text[j] !== "`" &&
      !(text[j] === "\\" && text[j + 1] === "`") &&
      text[j] !== "["
    ) {
      j++;
    }
    tokens.push(text.slice(i, j));
    i = j;
  }
  return tokens;
}

function findUnescapedBacktick(text: string, start: number): number {
  for (let i = start; i < text.length; i++) {
    if (text[i] === "\\") {
      i++; // skip escaped char
      continue;
    }
    if (text[i] === "`") return i;
  }
  return -1;
}
