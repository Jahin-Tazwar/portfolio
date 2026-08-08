export type Project = {
  n: string;
  title: string;
  blurb: string;
  tags: string[];
  status: { label: string; kind: "shipped" | "progress" };
  live?: string;
  repo: string;
};

export const featured: Project[] = [
  {
    n: "01",
    title: "NFA — a programming language & interpreter",
    blurb:
      "A dynamically-typed, C/Rust-inspired language built from scratch in C: hand-written lexer, recursive-descent parser, AST, tree-walking evaluator, and a block-scoped symbol table. Native CLI and an interactive REPL share one runtime core; compiled to WebAssembly (Emscripten) so it runs entirely in the browser, leak-free.",
    tags: ["C", "WebAssembly", "Interpreters", "Parsing"],
    status: { label: "shipped", kind: "shipped" },
    live: "https://nfa-lang.netlify.app",
    repo: "https://github.com/Jahin-Tazwar/NFA",
  },
  {
    n: "02",
    title: "NFA's Gambit — a chess engine",
    blurb:
      "A full chess engine in modern C++17: legal move generation (castling, en passant, pins, checks), board representation, positional evaluation, and a raylib GUI. Minimax with alpha-beta pruning and iterative deepening, RAII and smart pointers throughout, multithreaded search, and ported to WebAssembly for in-browser play.",
    tags: ["C++17", "Game AI", "Multithreading", "WASM"],
    status: { label: "shipped", kind: "shipped" },
    live: "https://nfa-gambit.netlify.app",
    repo: "https://github.com/Jahin-Tazwar/NFA-Gambit",
  },
  {
    n: "03",
    title: "Repo Explainer — AI codebase analysis",
    blurb:
      "An AI tool that ingests any public GitHub repository and generates consistent, developer-readable explanations of its architecture, module layout, and functionality — cutting onboarding from hours of file-by-file reading to a single pass. React front end, Node back end, LLM APIs.",
    tags: ["React", "Node.js", "LLM APIs"],
    status: { label: "shipped", kind: "shipped" },
    live: "https://repodecode.netlify.app",
    repo: "https://github.com/Jahin-Tazwar/Repo-Decoder-FE",
  },
  {
    n: "04",
    title: "CUET Lab — AI-driven educational platform",
    blurb:
      "A deployed platform hosting virtual lab simulations and course resources, centralizing materials that used to be scattered across sources and making them available on demand to an entire cohort.",
    tags: ["React", "JavaScript", "Education"],
    status: { label: "shipped", kind: "shipped" },
    live: "https://cuet-lab.netlify.app",
    repo: "https://github.com/Jahin-Tazwar/Lab-CUET",
  },
  {
    n: "05",
    title: "Calculator — full-stack (FE + BE)",
    blurb:
      "An early full-stack project with a separate deployed front end and back end. Included on purpose as a 'before' marker — a clear reference point for how far the work has come since.",
    tags: ["TypeScript", "Node.js", "Full-stack"],
    status: { label: "early work", kind: "shipped" },
    live: "https://calculator-be.vercel.app",
    repo: "https://github.com/Jahin-Tazwar/Calculator-FE",
  },
];

export const moreOnGitHub: { name: string; note: string; lang: string; repo: string }[] = [
  { name: "speech-analyzer", note: "Speech analysis tool — from the BUILD@CUET speedathon.", lang: "HTML/JS", repo: "https://github.com/Jahin-Tazwar/speech-analyzer" },
  { name: "multi-role-market", note: "Multi-role marketplace — built at BUILD@CUET.", lang: "TypeScript", repo: "https://github.com/Jahin-Tazwar/multi-role-market" },
  { name: "Hishab-AI", note: "AI experiment.", lang: "TypeScript", repo: "https://github.com/Jahin-Tazwar/Hishab-AI" },
  { name: "pulsemeet", note: "A Flutter mobile app.", lang: "Dart", repo: "https://github.com/Jahin-Tazwar/pulsemeet" },
  { name: "social", note: "A social app.", lang: "TypeScript", repo: "https://github.com/Jahin-Tazwar/social" },
  { name: "news-scraper", note: "News scraping utility.", lang: "JavaScript", repo: "https://github.com/Jahin-Tazwar/news-scraper" },
  { name: "Blog-App", note: "A full-stack blog app.", lang: "JavaScript", repo: "https://github.com/Jahin-Tazwar/Blog-App" },
];
