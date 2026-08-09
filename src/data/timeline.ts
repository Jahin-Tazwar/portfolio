export type Milestone = { when: string; title: string; body: string; emphasis?: boolean };

export const timeline: Milestone[] = [
  { when: "2020–21", title: "First lines of code", body: "Started out of pure curiosity after watching a developer build something cool. Wanted to know how it worked underneath." },
  { when: "2024", title: "Going full-stack", body: "Built and deployed real apps end to end — a blog, a calculator with a separate front and back end, React projects. Learning to actually ship." },
  { when: "2025", title: "The turn to systems", body: "Started NFA — a programming language written from scratch in C. The point where I wanted to understand the machine, not just use it." },
  { when: "2026", title: "CUET, and the hard stuff shipped", body: "Began B.Sc. in CSE at CUET. Shipped a language, a chess engine, and AI tools — and built at the BUILD@CUET speedathon (speech-analyzer, multi-role-market, n8n workflows).", emphasis: true },
  { when: "ongoing", title: "Still building", body: "CodeChef competitive rating 1279 and climbing; shipping fast as I learn. Expected graduation 2030." },
];
