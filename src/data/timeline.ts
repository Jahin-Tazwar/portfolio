export type Milestone = { when: string; title: string; body: string; emphasis?: boolean };

export const timeline: Milestone[] = [
  { when: "2020–21", title: "First lines of code", body: "Started messing with code after watching a developer build something I couldn't explain. I wanted to be the one who could explain it." },
  { when: "2024", title: "Going full-stack", body: "Shipped real apps end to end — a blog, a handwriting math solver, a handful of React projects. Learned what 'done and deployed' actually takes." },
  { when: "2025", title: "The turn to systems", body: "Started NFA, a language written from scratch in C. This is where I stopped just using the machine and started trying to understand it." },
  { when: "2026", title: "CUET, and the hard stuff shipped", body: "Started CSE at CUET. Shipped a language, a chess engine, and AI tools — and built three projects in one weekend at the BUILD@CUET speedathon.", emphasis: true },
  { when: "ongoing", title: "Still building", body: "Grinding algorithms (CodeChef 1279 and rising) and shipping as fast as I learn. Graduating 2030 — not waiting until then to build things." },
];
