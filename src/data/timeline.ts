export type Milestone = { when: string; title: string; body: string; emphasis?: boolean };

export const timeline: Milestone[] = [
  { when: "2020–21", title: "First lines of code", body: "Started out of pure curiosity after watching a developer build something cool. Wanted to know how it worked underneath." },
  { when: "2023", title: "SSC — GPA 5.00", body: "Chittagong Government High School. Coding on the side, constantly." },
  { when: "2025", title: "HSC — GPA 5.00", body: "Government City College, Chittagong. Deep in self-driven building by now." },
  { when: "2025–26", title: "Four projects, shipped", body: "Took a language, a chess engine, an AI codebase tool, and a lab platform from empty file to publicly deployed product." },
  { when: "2026", title: "CUET — CSE, Level 1", body: "Began B.Sc. in Computer Science & Engineering. Took part in the BUILD@CUET speedathon (speech-analyzer, multi-role-market, n8n workflows).", emphasis: true },
  { when: "ongoing", title: "Sharpening", body: "CodeChef competitive rating 1279 and climbing; regular algorithmic practice. Expected graduation 2030." },
];
