export const profile = {
  name: "Jahin Tazwar",
  role: "Software Engineer · CS student",
  tagline:
    "I build the hard parts by hand — a language, a chess engine — because that's how you actually learn them.",
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
    "I started writing code around 2020 because I wanted to know how the software I used actually worked. I still open things up just to see what's inside.",
    "For a while that meant front-end templates and small web apps. Then I set out to build my own programming language, and it rewired how I think. Writing a lexer, a parser, and an evaluator by hand — in C — was the first time the machine stopped being a black box.",
    "Since then I've taken four projects from an empty file to something people can open: a language, a chess engine, an AI tool that reads codebases, and a lab platform my university uses. I write the hard parts myself. A framework saves time, but it won't teach you what's underneath.",
    "I'm in my first year of Computer Science & Engineering at CUET. I'm early and I know it — which is exactly why I'm building as much as I can while I learn.",
  ],
} as const;
