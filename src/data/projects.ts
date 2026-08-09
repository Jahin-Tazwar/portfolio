export type Project = {
  n: string;
  title: string;
  blurb: string;
  tags: string[];
  status: { label: string; kind: "shipped" | "progress" };
  live?: string;
  repo: string;
  embed?: { url: string; label: string };
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
    embed: { url: "https://nfa-lang.netlify.app", label: "Write code in NFA and run it — this is the real interpreter, compiled to WebAssembly." },
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
    embed: { url: "https://nfa-gambit.netlify.app", label: "Play the engine right here — legal moves, checks, and the AI opponent all run in-browser." },
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
    title: "AI Math Notes — a handwriting calculator",
    blurb:
      "Draw a math expression on a canvas, hit Run, and it recognizes the handwriting and computes the answer. A full-stack build with a separate front end and back end — the project that got me comfortable wiring real apps end to end.",
    tags: ["TypeScript", "Canvas", "AI", "Full-stack"],
    status: { label: "shipped", kind: "shipped" },
    live: "https://ai-math-notes.netlify.app",
    repo: "https://github.com/Jahin-Tazwar/Calculator-FE",
    embed: { url: "https://ai-math-notes.netlify.app", label: "Draw a math expression, pick a pen colour, and hit Run — it reads the handwriting and solves it." },
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
