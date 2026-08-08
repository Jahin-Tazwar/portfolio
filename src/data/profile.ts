export const profile = {
  name: "Jahin Tazwar",
  role: "Software Engineer · CS student",
  tagline:
    "I build the hard parts from scratch — a language, a chess engine — to actually understand them.",
  // Real code from NFA (his language): recursive factorial, no `return` keyword.
  heroCode: [
    "fn factorial(n) {",
    "    if (n == 0)",
    "        1",
    "    else",
    "        n * factorial(n - 1)",
    "}",
    "// no `return` keyword — last",
    "// expression is the result",
    "print(factorial(5))  // 120",
  ].join("\n"),
  email: "tazwarjahin@gmail.com",
  github: "https://github.com/Jahin-Tazwar",
  linkedin: "https://www.linkedin.com/in/jahin-tazwar/",
  resume: "/Jahin-Tazwar-Resume.pdf",
  tools: [
    { group: "Languages", items: ["C", "C++ (C++17)", "JavaScript / TypeScript", "SQL"] },
    { group: "Web & data", items: ["React", "Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB", "SQLite"] },
    { group: "Systems & tools", items: ["WebAssembly (Emscripten)", "CMake", "Git / GitHub", "Linux", "VS Code"] },
    { group: "Concepts", items: ["Data structures & algorithms", "Compiler/interpreter design", "OOP", "Multithreading", "Memory management", "Performance optimization"] },
  ],
  // First-person, story-forward. DRAFT — Jahin to review voice before ship.
  about: [
    "I started out around 2020, just curious — I watched a developer build something and wanted to know how it actually worked underneath. That question never really went away.",
    "For a while that meant copying templates and wiring up web apps. Then I tried to build a programming language, and everything changed. Writing a lexer, a parser, an evaluator — by hand, in C — was the first time I felt like I understood the machine instead of just using it.",
    "Since then I've taken four projects from an empty file to something deployed and public: a language, a chess engine, an AI tool that explains codebases, and a lab platform for my university. I write the hard parts myself on purpose — no framework doing the thinking for me.",
    "Right now I'm in my first term of Computer Science & Engineering at CUET. I'm early, I know it, and I'm building as fast as I can learn.",
  ],
} as const;
