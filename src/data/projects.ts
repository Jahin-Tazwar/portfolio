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
      "A dynamically-typed language I wrote from scratch in C — hand-written lexer, recursive-descent parser, AST, and a tree-walking evaluator with real block scoping. One runtime core drives both a native CLI and a browser REPL; Emscripten compiles it to WebAssembly, so it runs client-side with no server and no leaks.",
    tags: ["C", "WebAssembly", "Interpreters", "Parsing"],
    status: { label: "shipped", kind: "shipped" },
    live: "https://nfa-lang.netlify.app",
    repo: "https://github.com/Jahin-Tazwar/NFA",
    embed: { url: "https://nfa-lang.netlify.app", label: "Write something in NFA and hit Run. This is the real interpreter, compiled to WebAssembly — no server involved." },
  },
  {
    n: "02",
    title: "NFA's Gambit — a chess engine",
    blurb:
      "A chess engine in modern C++17: full legal move generation — castling, en passant, pins, checks — plus board representation and positional evaluation behind a raylib GUI. The AI searches with minimax, alpha-beta pruning, and iterative deepening; RAII and smart pointers keep the memory honest. Ported to WebAssembly so you can play it here.",
    tags: ["C++17", "Game AI", "Multithreading", "WASM"],
    status: { label: "shipped", kind: "shipped" },
    live: "https://nfa-gambit.netlify.app",
    repo: "https://github.com/Jahin-Tazwar/NFA-Gambit",
    embed: { url: "https://nfa-gambit.netlify.app", label: "Your move. Legal moves, checks, and the AI opponent all run in your browser." },
  },
  {
    n: "03",
    title: "Repo Explainer — AI codebase analysis",
    blurb:
      "Point it at any public GitHub repo and it explains the architecture, the module layout, and how the pieces fit — turning hours of file-by-file reading into a single pass. React front end, Node back end, LLM APIs doing the reasoning.",
    tags: ["React", "Node.js", "LLM APIs"],
    status: { label: "shipped", kind: "shipped" },
    live: "https://repodecode.netlify.app",
    repo: "https://github.com/Jahin-Tazwar/Repo-Decoder-FE",
  },
  {
    n: "04",
    title: "CUET Lab — AI-driven educational platform",
    blurb:
      "A platform hosting virtual lab simulations and course material for my cohort at CUET — one place for resources that used to be scattered across a dozen sources.",
    tags: ["React", "JavaScript", "Education"],
    status: { label: "shipped", kind: "shipped" },
    live: "https://cuet-lab.netlify.app",
    repo: "https://github.com/Jahin-Tazwar/Lab-CUET",
  },
  {
    n: "05",
    title: "AI Math Notes — a handwriting calculator",
    blurb:
      "Handwrite a math expression on the canvas, hit Run, and it reads your handwriting and solves it. A full-stack build with a separate front and back end — the project that taught me to wire real apps end to end.",
    tags: ["TypeScript", "Canvas", "AI", "Full-stack"],
    status: { label: "shipped", kind: "shipped" },
    live: "https://ai-math-notes.netlify.app",
    repo: "https://github.com/Jahin-Tazwar/Calculator-FE",
    embed: { url: "https://ai-math-notes.netlify.app", label: "Draw an expression, pick a pen colour, hit Run. It reads the handwriting and solves it." },
  },
];

export const moreOnGitHub: { name: string; note: string; lang: string; repo: string }[] = [
  { name: "speech-analyzer", note: "Speech analysis, built in a weekend at the BUILD@CUET speedathon.", lang: "HTML / JS", repo: "https://github.com/Jahin-Tazwar/speech-analyzer" },
  { name: "multi-role-market", note: "A marketplace with role-based access — also from BUILD@CUET.", lang: "TypeScript", repo: "https://github.com/Jahin-Tazwar/multi-role-market" },
  { name: "Hishab-AI", note: "An AI take on keeping accounts (hishab).", lang: "TypeScript", repo: "https://github.com/Jahin-Tazwar/Hishab-AI" },
  { name: "pulsemeet", note: "A meetups app written in Flutter — my first real mobile build.", lang: "Dart", repo: "https://github.com/Jahin-Tazwar/pulsemeet" },
  { name: "Blog-App", note: "A full-stack blog — early practice with CRUD, auth, and deploys.", lang: "JavaScript", repo: "https://github.com/Jahin-Tazwar/Blog-App" },
  { name: "news-scraper", note: "Pulls news articles and structures them into clean data.", lang: "JavaScript", repo: "https://github.com/Jahin-Tazwar/news-scraper" },
];
