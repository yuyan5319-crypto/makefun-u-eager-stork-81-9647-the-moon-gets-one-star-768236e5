// The Moon Gets One Star — a one-star review of the Moon.
// Writes the review to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt) and prints it to stdout.
// The review must be 1-120 characters, not only whitespace, and
// must actually name the Moon: the program refuses to run if the
// line breaks the gate, so a bad line can never be submitted.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "★☆☆☆☆ The Moon only shows me one face after 4.5 billion years. Either it's hiding something or it's just rude.";

const MAX_CHARS = 120;

function charCount(text: string): number {
  // Count Unicode code points, as the gate counts characters.
  return [...text].length;
}

function validate(review: string): void {
  const chars = charCount(review);
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(
      `review must be 1-${MAX_CHARS} characters, got ${chars}`,
    );
  }
  if (review.trim().length === 0) {
    throw new Error("review must not be only whitespace");
  }
  if (!/\bmoon\b/i.test(review)) {
    throw new Error("review must name the Moon");
  }
  if (!/★/.test(review)) {
    throw new Error("review must carry its one-star rating");
  }
}

function main(): void {
  validate(REVIEW);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
  console.log(REVIEW);
}

main();
