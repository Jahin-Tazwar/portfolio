# Portfolio Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Jahin Tazwar's portfolio as an engineering-first, story-driven single-page site (Vite + React + TS) that showcases his real systems projects with his real code, voice, and journey.

**Architecture:** A single-page React app composed of one component per section (Hero, SelectedWork, Journey, About, Contact, MoreOnGitHub) plus small shared primitives (Reveal, Tag, StatusChip, CodePanel). All copy/links live in typed data modules under `src/data/` so content is separate from layout. Styling uses centralized design tokens (CSS custom properties) + CSS Modules. Motion is CSS-driven with an IntersectionObserver-based `Reveal` wrapper, and honors `prefers-reduced-motion`. No runtime API calls — all content is curated/static. Deploys to Netlify.

**Tech Stack:** Vite, React 18, TypeScript, Vitest + React Testing Library + jsdom, CSS Modules, IntersectionObserver.

**Design source of truth:** `docs/superpowers/specs/2026-08-08-portfolio-rework-design.md`. Read it before starting.

## Global Constraints

- Visual system: warm-ink background `#0e0f0d`, panel `#0a0b09`, cream text `#e9e6da`, muted text `#8f8b7e`, single accent muted-green `#a8c16a`, in-progress amber `#c9a45e`. Hairline borders `rgba(255,255,255,.07)`. These live as CSS custom properties defined once (Task 2) — never hard-code hex in components; use `var(--...)`.
- **Invoke `frontend-design:frontend-design` before building any visual component** (Tasks 5–11) to carry out the aesthetic intentionally. The plan gives structure + real content + tests; the skill governs polish (spacing, type scale, hierarchy).
- All content must be true — sourced from the design spec, the résumé, and each repo's README. **No invented personality** (no fake "now playing"/"coffees" strips, no manufactured status). No progress-bar skill meters, no gradient blobs, no testimonials.
- All motion must be disabled/instant under `prefers-reduced-motion: reduce`.
- Fully responsive, mobile-first, no horizontal overflow. Semantic landmarks, keyboard-navigable, visible focus, `alt` text.
- External links (`live demo`, GitHub, LinkedIn) open in a new tab with `rel="noopener noreferrer"`.
- Node 18+. Package manager: npm. Commit after every task.
- Contact: email `tazwarjahin@gmail.com`, GitHub `https://github.com/Jahin-Tazwar`, LinkedIn `https://www.linkedin.com/in/jahin-tazwar/`, résumé PDF served from `/Jahin-Tazwar-Resume.pdf`. Do NOT publish the phone number unless the user later says so.

---

## File Structure

```
C:\Portfolio\
  index.html                      # Vite entry (replaces old template index.html)
  package.json, tsconfig*.json, vite.config.ts, vitest.config.ts
  netlify.toml                    # deploy config
  public/
    Jahin-Tazwar-Resume.pdf       # copied from D:\Resume\Resume.pdf
    favicon.svg
  src/
    main.tsx                      # React root
    App.tsx                       # assembles sections
    styles/
      tokens.css                  # design tokens (colors, spacing, type, motion)
      global.css                  # resets, base element styles, grid bg, reduced-motion
    data/
      projects.ts                 # featured projects + moreOnGitHub, typed
      timeline.ts                 # journey milestones, typed
      profile.ts                  # name, tagline, socials, tools, hero code
    components/
      Reveal.tsx / Reveal.module.css
      Tag.tsx / StatusChip.tsx / CodePanel.tsx (+ .module.css)
      Nav.tsx / Nav.module.css
      Hero.tsx / Hero.module.css
      SelectedWork.tsx / ProjectRow.tsx / SelectedWork.module.css
      Journey.tsx / Journey.module.css
      About.tsx / About.module.css
      Contact.tsx / Contact.module.css
      MoreOnGitHub.tsx / MoreOnGitHub.module.css
    test/setup.ts                 # RTL + jsdom + IntersectionObserver mock
```

The old static site (`css/`, `js/`, `assets/`, old `index.html`, `sitemap.xml`) is removed as part of Task 1 (baseline already committed in git, so it is recoverable).

---

## Task 1: Scaffold Vite + React + TS + Vitest, remove old site

**Files:**
- Create: `package.json`, `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/test/setup.ts`, `src/App.test.tsx`
- Delete: old `index.html`, `css/`, `js/`, `assets/` (template assets), old `sitemap.xml`

**Interfaces:**
- Produces: `App` (default export React component) rendering a `<main>` landmark; test infra runnable via `npm test`.

- [ ] **Step 1: Remove old template files**

```bash
cd /c/Portfolio
git rm -r --quiet css js assets index.html sitemap.xml
```

- [ ] **Step 2: Create package.json**

```json
{
  "name": "jahin-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^24.1.0",
    "typescript": "^5.5.3",
    "vite": "^5.3.3",
    "vitest": "^2.0.1"
  }
}
```

- [ ] **Step 3: Create config files**

`vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({ plugins: [react()] });
```

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true, setupFiles: ["./src/test/setup.ts"] },
});
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

`tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "vitest.config.ts"]
}
```

- [ ] **Step 4: Create index.html, entry, App, and test setup**

`index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jahin Tazwar — Software Engineer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/main.tsx`:
```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

`src/App.tsx`:
```tsx
export default function App() {
  return (
    <main>
      <h1>Jahin Tazwar</h1>
    </main>
  );
}
```

`src/test/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";

// IntersectionObserver isn't implemented in jsdom; provide a no-op that
// immediately reports elements as intersecting so Reveal renders content.
class IO {
  constructor(private cb: IntersectionObserverCallback) {}
  observe(el: Element) {
    this.cb([{ isIntersecting: true, target: el } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
  root = null; rootMargin = ""; thresholds = [];
}
// @ts-expect-error assign mock
globalThis.IntersectionObserver = IO;

// matchMedia mock (defaults to no reduced-motion)
globalThis.matchMedia ??= ((q: string) => ({
  matches: false, media: q, onchange: null,
  addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent() { return false; },
})) as unknown as typeof globalThis.matchMedia;
```

- [ ] **Step 5: Write the smoke test**

`src/App.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the name in a main landmark", () => {
  render(<App />);
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /jahin tazwar/i })).toBeInTheDocument();
});
```

- [ ] **Step 6: Install and run**

```bash
npm install
npm test
```
Expected: 1 passing test. Also run `npm run dev` once to confirm the page loads without errors, then stop it.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite+React+TS+Vitest, remove old template site"
```

---

## Task 2: Design tokens + global styles

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`
- Modify: `src/main.tsx` (import both stylesheets)

**Interfaces:**
- Produces: CSS custom properties on `:root` — `--bg`, `--panel`, `--text`, `--muted`, `--faint`, `--accent`, `--amber`, `--border`, spacing scale `--s-1..--s-8`, `--maxw`, radii, and motion tokens `--dur`, `--ease`. A global `.reveal`-less base; `[data-reduce-motion]` handling. Grid background utility on `body`.

Note: this task is styling; verify visually in the browser rather than via unit tests.

- [ ] **Step 1: Create tokens.css**

`src/styles/tokens.css`:
```css
:root {
  --bg: #0e0f0d;
  --panel: #0a0b09;
  --text: #e9e6da;
  --muted: #8f8b7e;
  --muted-2: #a5a091;
  --faint: rgba(255, 255, 255, 0.028);
  --accent: #a8c16a;
  --amber: #c9a45e;
  --border: rgba(255, 255, 255, 0.07);
  --border-strong: rgba(255, 255, 255, 0.09);

  --maxw: 860px;
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px;
  --s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 72px;
  --radius: 8px; --radius-lg: 10px;

  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;

  --dur: 0.6s;
  --ease: cubic-bezier(0.2, 0.7, 0.3, 1);
}
```

- [ ] **Step 2: Create global.css**

`src/styles/global.css`:
```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background-color: var(--bg);
  background-image:
    linear-gradient(var(--faint) 1px, transparent 1px),
    linear-gradient(90deg, var(--faint) 1px, transparent 1px);
  background-size: 30px 30px;
  color: var(--text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
}
a { color: inherit; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 3px; }
img { max-width: 100%; display: block; }
h1, h2, h3 { line-height: 1.15; letter-spacing: -0.02em; margin: 0; }
.mono { font-family: var(--font-mono); }
.eyebrow {
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 2px;
  text-transform: uppercase; color: var(--muted);
}
.container { max-width: var(--maxw); margin: 0 auto; padding: 0 var(--s-5); }
.section { padding: var(--s-8) 0; border-top: 1px solid var(--border); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 3: Import styles in main.tsx**

Add at top of `src/main.tsx`:
```tsx
import "./styles/tokens.css";
import "./styles/global.css";
```

- [ ] **Step 4: Verify**

Run `npm run dev`, confirm dark warm-ink background with faint grid and cream text. Run `npm test` to confirm nothing broke.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add design tokens and global styles (warm-ink system)"
```

---

## Task 3: Content data modules (real content, typed + validated)

**Files:**
- Create: `src/data/profile.ts`, `src/data/projects.ts`, `src/data/timeline.ts`
- Test: `src/data/data.test.ts`

**Interfaces:**
- Produces:
  - `profile: { name: string; role: string; tagline: string; heroCode: string; email: string; github: string; linkedin: string; resume: string; tools: { group: string; items: string[] }[]; about: string[] }`
  - `type Project = { n: string; title: string; blurb: string; tags: string[]; status: { label: string; kind: "shipped" | "progress" }; live?: string; repo: string }`
  - `featured: Project[]` (length 5), `moreOnGitHub: { name: string; note: string; lang: string; repo: string }[]`
  - `type Milestone = { when: string; title: string; body: string; emphasis?: boolean }`; `timeline: Milestone[]`

- [ ] **Step 1: Write the failing test**

`src/data/data.test.ts`:
```ts
import { profile } from "./profile";
import { featured, moreOnGitHub } from "./projects";
import { timeline } from "./timeline";

const httpsOk = (u: string) => /^https:\/\/.+/.test(u);

test("profile has real contact + tools + about", () => {
  expect(profile.email).toBe("tazwarjahin@gmail.com");
  expect(httpsOk(profile.github)).toBe(true);
  expect(httpsOk(profile.linkedin)).toBe(true);
  expect(profile.resume).toMatch(/\.pdf$/);
  expect(profile.about.length).toBeGreaterThanOrEqual(3);
  expect(profile.tools.length).toBeGreaterThanOrEqual(3);
  expect(profile.heroCode).toMatch(/factorial/);
});

test("exactly 5 featured projects, each valid", () => {
  expect(featured).toHaveLength(5);
  for (const p of featured) {
    expect(p.title.length).toBeGreaterThan(0);
    expect(p.blurb.length).toBeGreaterThan(20);
    expect(p.tags.length).toBeGreaterThan(0);
    expect(["shipped", "progress"]).toContain(p.status.kind);
    expect(httpsOk(p.repo)).toBe(true);
    if (p.live) expect(httpsOk(p.live)).toBe(true);
  }
});

test("more-on-github excludes client sites", () => {
  const banned = /restaurant|barber|patio|plumbing|benavidez|goldies|loyola|cloverleaf|foothills|town-and-country|simmons/i;
  for (const r of moreOnGitHub) expect(banned.test(r.repo)).toBe(false);
});

test("timeline is non-empty and ordered oldest-first", () => {
  expect(timeline.length).toBeGreaterThanOrEqual(5);
  expect(timeline[0].when).toMatch(/2020|2021/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- data.test`
Expected: FAIL (modules not found).

- [ ] **Step 3: Create profile.ts**

`src/data/profile.ts`:
```ts
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
```

- [ ] **Step 4: Create projects.ts**

`src/data/projects.ts`:
```ts
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
```

- [ ] **Step 5: Create timeline.ts**

`src/data/timeline.ts`:
```ts
export type Milestone = { when: string; title: string; body: string; emphasis?: boolean };

export const timeline: Milestone[] = [
  { when: "2020–21", title: "First lines of code", body: "Started out of pure curiosity after watching a developer build something cool. Wanted to know how it worked underneath." },
  { when: "2023", title: "SSC — GPA 5.00", body: "Chittagong Government High School. Coding on the side, constantly." },
  { when: "2025", title: "HSC — GPA 5.00", body: "Government City College, Chittagong. Deep in self-driven building by now." },
  { when: "2025–26", title: "Four projects, shipped", body: "Took a language, a chess engine, an AI codebase tool, and a lab platform from empty file to publicly deployed product." },
  { when: "2026", title: "CUET — CSE, Level 1", body: "Began B.Sc. in Computer Science & Engineering. Took part in the BUILD@CUET speedathon (speech-analyzer, multi-role-market, n8n workflows).", emphasis: true },
  { when: "ongoing", title: "Sharpening", body: "CodeChef competitive rating 1279 and climbing; regular algorithmic practice. Expected graduation 2030." },
];
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npm test -- data.test`
Expected: PASS (all 4 tests).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add typed content data modules (profile, projects, timeline)"
```

---

## Task 4: Shared primitives — Reveal, Tag, StatusChip, CodePanel

**Files:**
- Create: `src/components/Reveal.tsx`, `Reveal.module.css`, `src/components/Tag.tsx`, `src/components/StatusChip.tsx`, `src/components/CodePanel.tsx`, `src/components/primitives.module.css`
- Test: `src/components/primitives.test.tsx`

**Interfaces:**
- Produces:
  - `Reveal({ children, delay?: number }): JSX.Element` — wraps content, adds a rise-in animation once it scrolls into view (via IntersectionObserver); renders children immediately when observer reports intersection or when reduced-motion.
  - `Tag({ children }): JSX.Element` — mono pill.
  - `StatusChip({ label, kind }): JSX.Element` — `kind` "shipped" → green, "progress" → amber.
  - `CodePanel({ filename, code }): JSX.Element` — panel with header + `<pre>` of code + blinking caret.

- [ ] **Step 1: Write the failing test**

`src/components/primitives.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";
import { StatusChip } from "./StatusChip";
import { CodePanel } from "./CodePanel";

test("Reveal renders its children", () => {
  render(<Reveal><p>hello world</p></Reveal>);
  expect(screen.getByText("hello world")).toBeInTheDocument();
});

test("Tag renders text", () => {
  render(<Tag>C++</Tag>);
  expect(screen.getByText("C++")).toBeInTheDocument();
});

test("StatusChip shows label and data-kind", () => {
  render(<StatusChip label="shipped" kind="shipped" />);
  const chip = screen.getByText("shipped");
  expect(chip).toHaveAttribute("data-kind", "shipped");
});

test("CodePanel shows filename and code", () => {
  render(<CodePanel filename="factorial.nfa" code={"print(factorial(5))"} />);
  expect(screen.getByText("factorial.nfa")).toBeInTheDocument();
  expect(screen.getByText(/print\(factorial\(5\)\)/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- primitives.test`
Expected: FAIL (components not found).

- [ ] **Step 3: Implement Reveal**

`src/components/Reveal.tsx`:
```tsx
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Reveal.module.css";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setShown(true); io.disconnect(); }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.reveal} ${shown ? styles.shown : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
```

`src/components/Reveal.module.css`:
```css
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity var(--dur) var(--ease), transform var(--dur) var(--ease);
}
.shown { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 4: Implement Tag, StatusChip, CodePanel**

`src/components/Tag.tsx`:
```tsx
import type { ReactNode } from "react";
import styles from "./primitives.module.css";

export function Tag({ children }: { children: ReactNode }) {
  return <span className={styles.tag}>{children}</span>;
}
```

`src/components/StatusChip.tsx`:
```tsx
import styles from "./primitives.module.css";

export function StatusChip({ label, kind }: { label: string; kind: "shipped" | "progress" }) {
  return <span className={styles.chip} data-kind={kind}>{label}</span>;
}
```

`src/components/CodePanel.tsx`:
```tsx
import styles from "./primitives.module.css";

export function CodePanel({ filename, code }: { filename: string; code: string }) {
  return (
    <div className={styles.codePanel}>
      <div className={styles.codeHeader}>
        <span className={styles.dot} aria-hidden="true" />
        <span className="mono">{filename}</span>
      </div>
      <pre className={styles.codeBody}><code>{code}</code><span className={styles.caret} aria-hidden="true" /></pre>
    </div>
  );
}
```

`src/components/primitives.module.css`:
```css
.tag {
  font-family: var(--font-mono); font-size: 11px; color: var(--muted-2);
  border: 1px solid var(--border-strong); border-radius: 999px; padding: 3px 9px;
}
.chip {
  font-family: var(--font-mono); font-size: 11px; border-radius: 999px; padding: 2px 8px;
}
.chip[data-kind="shipped"] { color: var(--accent); border: 1px solid rgba(168,193,106,.4); }
.chip[data-kind="progress"] { color: var(--amber); border: 1px solid rgba(201,164,94,.4); }

.codePanel {
  background: var(--panel); border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg); overflow: hidden;
  box-shadow: 0 20px 50px -20px rgba(0,0,0,.6);
}
.codeHeader {
  display: flex; align-items: center; gap: var(--s-2);
  padding: 9px 12px; border-bottom: 1px solid var(--border);
  font-family: var(--font-mono); font-size: 11px; color: var(--muted);
}
.dot { width: 9px; height: 9px; border-radius: 50%; background: #3a3d36; }
.codeBody {
  margin: 0; padding: var(--s-4); font-family: var(--font-mono);
  font-size: 12.5px; line-height: 1.75; color: #d7d3c6; white-space: pre; overflow-x: auto;
}
.caret {
  display: inline-block; width: 8px; height: 15px; background: var(--accent);
  vertical-align: -2px; margin-left: 2px; animation: caret 1.1s step-end infinite;
}
@keyframes caret { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .caret { animation: none; } }
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- primitives.test`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add shared primitives (Reveal, Tag, StatusChip, CodePanel)"
```

---

## Task 5: Nav + smooth-scroll shell

**Files:**
- Create: `src/components/Nav.tsx`, `src/components/Nav.module.css`
- Modify: `src/App.tsx` (render Nav + empty section anchors)
- Test: `src/components/Nav.test.tsx`

**Interfaces:**
- Consumes: `profile` (for the logo/name).
- Produces: `Nav()` with links to `#work`, `#about`, `#journey`, `#contact`. App renders `<section id="...">` anchors so links resolve.

Invoke `frontend-design:frontend-design` before styling.

- [ ] **Step 1: Write the failing test**

`src/components/Nav.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { Nav } from "./Nav";

test("nav links point to the section anchors", () => {
  render(<Nav />);
  for (const id of ["work", "about", "journey", "contact"]) {
    const link = screen.getByRole("link", { name: new RegExp(id, "i") });
    expect(link).toHaveAttribute("href", `#${id}`);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- Nav.test`
Expected: FAIL.

- [ ] **Step 3: Implement Nav**

`src/components/Nav.tsx`:
```tsx
import styles from "./Nav.module.css";

const links = [
  { id: "work", label: "work" },
  { id: "about", label: "about" },
  { id: "journey", label: "journey" },
  { id: "contact", label: "contact" },
];

export function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={`mono ${styles.logo}`}>jahin_tazwar</a>
        <nav className={styles.links} aria-label="Primary">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="mono">{l.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

`src/components/Nav.module.css`:
```css
.nav {
  position: sticky; top: 0; z-index: 10;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.inner { display: flex; justify-content: space-between; align-items: center; padding-top: var(--s-4); padding-bottom: var(--s-4); }
.logo { font-weight: 600; text-decoration: none; font-size: 13px; }
.links { display: flex; gap: var(--s-5); font-size: 12px; }
.links a { color: var(--muted); text-decoration: none; }
.links a:hover { color: var(--text); }
```

- [ ] **Step 4: Wire into App**

Replace `src/App.tsx`:
```tsx
import { Nav } from "./components/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <section id="work" className="section"><div className="container" /></section>
        <section id="about" className="section"><div className="container" /></section>
        <section id="journey" className="section"><div className="container" /></section>
        <section id="contact" className="section"><div className="container" /></section>
      </main>
    </>
  );
}
```
(The App smoke test from Task 1 asserted an `<h1>`; update it: the Hero task adds the heading. For now, change `src/App.test.tsx` to assert `screen.getByRole("main")` only.)

- [ ] **Step 5: Update App test, run**

Edit `src/App.test.tsx` to keep only the `main` landmark assertion. Run `npm test`.
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add sticky nav and section shell"
```

---

## Task 6: Hero section

**Files:**
- Create: `src/components/Hero.tsx`, `src/components/Hero.module.css`
- Modify: `src/App.tsx` (render `<Hero />` above the sections, inside/above `#top`)
- Test: `src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: `profile`, `CodePanel`, `Reveal`.
- Produces: `Hero()` — eyebrow, headline with hand-drawn underline SVG on "by hand", subhead, CTAs (Read the work → `#work`; Résumé → `profile.resume`), GitHub/LinkedIn links, and a `CodePanel` with `profile.heroCode`.

Invoke `frontend-design:frontend-design` before styling.

- [ ] **Step 1: Write the failing test**

`src/components/Hero.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

test("hero shows identity, CTAs, résumé and real code", () => {
  render(<Hero />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /read the work/i })).toHaveAttribute("href", "#work");
  const resume = screen.getByRole("link", { name: /résumé|resume/i });
  expect(resume).toHaveAttribute("href", "/Jahin-Tazwar-Resume.pdf");
  expect(screen.getByText(/factorial/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- Hero.test` → FAIL.

- [ ] **Step 3: Implement Hero**

`src/components/Hero.tsx`:
```tsx
import { profile } from "../data/profile";
import { CodePanel } from "./CodePanel";
import { Reveal } from "./Reveal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.grid}`}>
        <div>
          <Reveal><p className="eyebrow">// software, written from scratch</p></Reveal>
          <Reveal delay={120}>
            <h1 id="hero-heading" className={styles.headline}>
              I build languages, engines, and tools{" "}
              <span className={styles.mark}>
                by hand
                <svg className={styles.underline} width="118" height="12" viewBox="0 0 118 12" fill="none" aria-hidden="true">
                  <path d="M2 7C24 3 60 3 116 6" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              — so I actually understand them.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className={styles.sub}>
              Computer science student. Right now: a programming language written in C, and a
              chess engine in C++. No framework is doing the hard part for me.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className={styles.ctas}>
              <a href="#work" className={styles.primary}>Read the work →</a>
              <a href={profile.resume} className={styles.secondary} target="_blank" rel="noopener noreferrer">Résumé</a>
              <a href={profile.github} className={styles.textlink} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={profile.linkedin} className={styles.textlink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={240}>
          <CodePanel filename="factorial.nfa  // my language" code={profile.heroCode} />
        </Reveal>
      </div>
    </section>
  );
}
```

`src/components/Hero.module.css`:
```css
.hero { padding: var(--s-8) 0; }
.grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: var(--s-6); align-items: center; }
.headline { font-size: clamp(28px, 4.5vw, 40px); font-weight: 650; margin-top: var(--s-4); }
.mark { position: relative; white-space: nowrap; }
.underline { position: absolute; left: 0; bottom: -8px; stroke-dasharray: 240; stroke-dashoffset: 240; animation: draw 1s var(--ease) 0.5s forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
.sub { color: var(--muted-2); font-size: 16px; max-width: 480px; margin-top: var(--s-5); }
.ctas { display: flex; gap: var(--s-4); align-items: center; margin-top: var(--s-6); font-family: var(--font-mono); font-size: 14px; flex-wrap: wrap; }
.primary { background: var(--text); color: var(--bg); padding: 9px 16px; border-radius: var(--radius); font-weight: 600; text-decoration: none; }
.secondary { color: var(--text); text-decoration: none; border: 1px solid var(--border-strong); padding: 9px 16px; border-radius: var(--radius); }
.textlink { color: var(--muted); text-decoration: none; }
.textlink:hover { color: var(--text); }
@media (prefers-reduced-motion: reduce) { .underline { stroke-dashoffset: 0; animation: none; } }
@media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Render Hero in App**

In `src/App.tsx`, import `Hero` and render `<Hero />` as the first child of `<main id="top">`.

- [ ] **Step 5: Run tests**

Run `npm test`. Expected: PASS. Then `npm run dev` to eyeball the hero.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add hero section with real code panel"
```

---

## Task 7: Selected Work section

**Files:**
- Create: `src/components/SelectedWork.tsx`, `src/components/ProjectRow.tsx`, `src/components/SelectedWork.module.css`
- Modify: `src/App.tsx` (fill `#work` section)
- Test: `src/components/SelectedWork.test.tsx`

**Interfaces:**
- Consumes: `featured` (Project[]), `Reveal`, `Tag`, `StatusChip`.
- Produces: `SelectedWork()` rendering an eyebrow + one `ProjectRow` per featured project. `ProjectRow({ project }: { project: Project })`.

Invoke `frontend-design:frontend-design` before styling.

- [ ] **Step 1: Write the failing test**

`src/components/SelectedWork.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { SelectedWork } from "./SelectedWork";
import { featured } from "../data/projects";

test("renders all featured projects with links and status", () => {
  render(<SelectedWork />);
  for (const p of featured) {
    expect(screen.getByRole("heading", { name: new RegExp(p.title.split(" — ")[0], "i") })).toBeInTheDocument();
  }
  // every project has a source ('code') link
  const codeLinks = screen.getAllByRole("link", { name: /code|github|source/i });
  expect(codeLinks.length).toBeGreaterThanOrEqual(featured.length);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- SelectedWork.test` → FAIL.

- [ ] **Step 3: Implement ProjectRow**

`src/components/ProjectRow.tsx`:
```tsx
import type { Project } from "../data/projects";
import { Tag } from "./Tag";
import { StatusChip } from "./StatusChip";
import styles from "./SelectedWork.module.css";

export function ProjectRow({ project: p }: { project: Project }) {
  const chipKind = p.status.kind === "progress" ? "progress" : "shipped";
  return (
    <article className={styles.row}>
      <span className={`mono ${styles.num}`}>{p.n}</span>
      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.title}>{p.title}</h3>
          <StatusChip label={p.status.label} kind={chipKind} />
        </div>
        <p className={styles.blurb}>{p.blurb}</p>
        <div className={styles.footer}>
          <div className={styles.tags}>{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          <div className={styles.links}>
            {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="mono">live demo ↗</a>}
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="mono">code ↗</a>
          </div>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Implement SelectedWork**

`src/components/SelectedWork.tsx`:
```tsx
import { featured } from "../data/projects";
import { ProjectRow } from "./ProjectRow";
import { Reveal } from "./Reveal";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  return (
    <div className="container">
      <p className="eyebrow">selected work</p>
      <div className={styles.list}>
        {featured.map((p, i) => (
          <Reveal key={p.n} delay={i * 60}><ProjectRow project={p} /></Reveal>
        ))}
      </div>
    </div>
  );
}
```

`src/components/SelectedWork.module.css`:
```css
.list { margin-top: var(--s-5); }
.row { display: flex; gap: var(--s-4); padding: var(--s-5) 0; border-bottom: 1px solid var(--border); }
.row:hover .title { color: var(--accent); }
.num { color: #4f4c44; font-size: 14px; }
.body { flex: 1; }
.head { display: flex; justify-content: space-between; align-items: baseline; gap: var(--s-4); }
.title { font-size: clamp(17px, 2.4vw, 19px); font-weight: 600; transition: color var(--dur) var(--ease); }
.blurb { color: var(--muted-2); font-size: 14px; margin: var(--s-2) 0 var(--s-4); }
.footer { display: flex; justify-content: space-between; gap: var(--s-4); flex-wrap: wrap; align-items: center; }
.tags { display: flex; gap: 7px; flex-wrap: wrap; }
.links { display: flex; gap: var(--s-4); font-size: 12px; }
.links a { color: var(--accent); text-decoration: none; }
.links a:hover { text-decoration: underline; }
```

- [ ] **Step 5: Fill `#work` in App**

In `src/App.tsx`, put `<SelectedWork />` inside `<section id="work" className="section">`.

- [ ] **Step 6: Run tests**

Run `npm test`. Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add selected work section"
```

---

## Task 8: Journey timeline

**Files:**
- Create: `src/components/Journey.tsx`, `src/components/Journey.module.css`
- Modify: `src/App.tsx` (fill `#journey`)
- Test: `src/components/Journey.test.tsx`

**Interfaces:**
- Consumes: `timeline` (Milestone[]), `Reveal`.
- Produces: `Journey()` rendering an eyebrow + ordered list of milestones; emphasized milestone visually highlighted.

Invoke `frontend-design:frontend-design` before styling.

- [ ] **Step 1: Write the failing test**

`src/components/Journey.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { Journey } from "./Journey";
import { timeline } from "../data/timeline";

test("renders every milestone in order", () => {
  render(<Journey />);
  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(timeline.length);
  expect(items[0]).toHaveTextContent(timeline[0].title);
  expect(items[items.length - 1]).toHaveTextContent(timeline[timeline.length - 1].title);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- Journey.test` → FAIL.

- [ ] **Step 3: Implement Journey**

`src/components/Journey.tsx`:
```tsx
import { timeline } from "../data/timeline";
import { Reveal } from "./Reveal";
import styles from "./Journey.module.css";

export function Journey() {
  return (
    <div className="container">
      <p className="eyebrow">the journey</p>
      <ol className={styles.list}>
        {timeline.map((m, i) => (
          <li key={i} className={`${styles.item} ${m.emphasis ? styles.emph : ""}`}>
            <Reveal delay={i * 60}>
              <div className={styles.itemInner}>
                <span className={`mono ${styles.when}`}>{m.when}</span>
                <div>
                  <h3 className={styles.title}>{m.title}</h3>
                  <p className={styles.body}>{m.body}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

`src/components/Journey.module.css`:
```css
.list { list-style: none; padding: 0; margin: var(--s-5) 0 0; }
.item { padding: var(--s-4) 0; border-left: 1px solid var(--border); padding-left: var(--s-5); position: relative; }
.item::before { content: ""; position: absolute; left: -4px; top: var(--s-5); width: 7px; height: 7px; border-radius: 50%; background: #3a3d36; }
.emph { border-left-color: var(--accent); }
.emph::before { background: var(--accent); box-shadow: 0 0 10px var(--accent); }
.itemInner { display: flex; gap: var(--s-4); }
.when { color: var(--muted); min-width: 68px; font-size: 13px; }
.emph .when, .emph .title { color: var(--text); }
.title { font-size: 16px; font-weight: 600; }
.body { color: var(--muted-2); font-size: 14px; margin-top: var(--s-1); }
@media (max-width: 560px) { .itemInner { flex-direction: column; gap: var(--s-1); } }
```

- [ ] **Step 4: Fill `#journey` in App**

Put `<Journey />` inside `<section id="journey" className="section">`.

- [ ] **Step 5: Run tests** → `npm test` → PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add journey timeline"
```

---

## Task 9: About section

**Files:**
- Create: `src/components/About.tsx`, `src/components/About.module.css`
- Modify: `src/App.tsx` (fill `#about`)
- Test: `src/components/About.test.tsx`

**Interfaces:**
- Consumes: `profile` (`about` paragraphs, `tools`), `Reveal`.
- Produces: `About()` rendering the narrative paragraphs + a "tools I reach for" grouped list.

Invoke `frontend-design:frontend-design` before styling.

- [ ] **Step 1: Write the failing test**

`src/components/About.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { About } from "./About";
import { profile } from "../data/profile";

test("renders about narrative and tool groups", () => {
  render(<About />);
  expect(screen.getByText(new RegExp(profile.about[0].slice(0, 24), "i"))).toBeInTheDocument();
  for (const g of profile.tools) {
    expect(screen.getByText(g.group)).toBeInTheDocument();
  }
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test -- About.test` → FAIL.

- [ ] **Step 3: Implement About**

`src/components/About.tsx`:
```tsx
import { profile } from "../data/profile";
import { Reveal } from "./Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <div className="container">
      <p className="eyebrow">about</p>
      <div className={styles.grid}>
        <Reveal>
          <div className={styles.prose}>
            {profile.about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className={styles.tools}>
            <h3 className={styles.toolsTitle}>Tools I reach for</h3>
            {profile.tools.map((g) => (
              <div key={g.group} className={styles.group}>
                <span className={`mono ${styles.groupName}`}>{g.group}</span>
                <span className={styles.items}>{g.items.join(" · ")}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
```

`src/components/About.module.css`:
```css
.grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: var(--s-6); margin-top: var(--s-5); }
.prose p { color: var(--muted-2); margin: 0 0 var(--s-4); max-width: 52ch; }
.prose p:first-child { color: var(--text); font-size: 18px; }
.tools { border-left: 1px solid var(--border); padding-left: var(--s-5); }
.toolsTitle { font-size: 14px; margin-bottom: var(--s-4); }
.group { margin-bottom: var(--s-4); }
.groupName { display: block; color: var(--accent); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
.items { color: var(--muted-2); font-size: 13.5px; }
@media (max-width: 760px) { .grid { grid-template-columns: 1fr; } .tools { border-left: none; padding-left: 0; } }
```

- [ ] **Step 4: Fill `#about` in App**

Put `<About />` inside `<section id="about" className="section">`.

- [ ] **Step 5: Run tests** → `npm test` → PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add about section with tools"
```

---

## Task 10: Contact + Footer + More on GitHub

**Files:**
- Create: `src/components/Contact.tsx`, `src/components/Contact.module.css`, `src/components/MoreOnGitHub.tsx`, `src/components/MoreOnGitHub.module.css`
- Modify: `src/App.tsx` (fill `#contact`, add MoreOnGitHub before contact)
- Test: `src/components/Contact.test.tsx`, `src/components/MoreOnGitHub.test.tsx`

**Interfaces:**
- Consumes: `profile`, `moreOnGitHub`, `Reveal`.
- Produces: `Contact()` with email/GitHub/LinkedIn/résumé links + footer copyright; `MoreOnGitHub()` grid.

Invoke `frontend-design:frontend-design` before styling.

- [ ] **Step 1: Write the failing tests**

`src/components/Contact.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";

test("contact exposes email, github, linkedin, résumé", () => {
  render(<Contact />);
  expect(screen.getByRole("link", { name: /tazwarjahin@gmail.com/i })).toHaveAttribute("href", "mailto:tazwarjahin@gmail.com");
  expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", "https://github.com/Jahin-Tazwar");
  expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("href", "https://www.linkedin.com/in/jahin-tazwar/");
  expect(screen.getByRole("link", { name: /résumé|resume/i })).toHaveAttribute("href", "/Jahin-Tazwar-Resume.pdf");
});
```

`src/components/MoreOnGitHub.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { MoreOnGitHub } from "./MoreOnGitHub";
import { moreOnGitHub } from "../data/projects";

test("renders a card per repo", () => {
  render(<MoreOnGitHub />);
  for (const r of moreOnGitHub) {
    expect(screen.getByRole("link", { name: new RegExp(r.name, "i") })).toHaveAttribute("href", r.repo);
  }
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npm test -- Contact.test MoreOnGitHub.test` → FAIL.

- [ ] **Step 3: Implement Contact**

`src/components/Contact.tsx`:
```tsx
import { profile } from "../data/profile";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <div className="container">
      <p className="eyebrow">contact</p>
      <h2 className={styles.title}>Building something, or hiring for it? Say hi.</h2>
      <div className={styles.links}>
        <a href={`mailto:${profile.email}`} className="mono">{profile.email}</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="mono">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mono">LinkedIn</a>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="mono">Résumé ↗</a>
      </div>
      <p className={styles.copy}>© {new Date().getFullYear()} Jahin Tazwar · Chittagong, Bangladesh</p>
    </div>
  );
}
```

`src/components/Contact.module.css`:
```css
.title { font-size: clamp(20px, 3vw, 26px); font-weight: 600; margin: var(--s-4) 0 var(--s-5); max-width: 18ch; }
.links { display: flex; gap: var(--s-5); flex-wrap: wrap; font-size: 14px; }
.links a { color: var(--text); text-decoration: none; border-bottom: 1px solid var(--border-strong); padding-bottom: 2px; }
.links a:hover { color: var(--accent); border-color: var(--accent); }
.copy { color: var(--muted); font-size: 12px; margin-top: var(--s-8); }
```

- [ ] **Step 4: Implement MoreOnGitHub**

`src/components/MoreOnGitHub.tsx`:
```tsx
import { moreOnGitHub } from "../data/projects";
import { Reveal } from "./Reveal";
import styles from "./MoreOnGitHub.module.css";

export function MoreOnGitHub() {
  return (
    <div className="container">
      <p className="eyebrow">more on github</p>
      <div className={styles.grid}>
        {moreOnGitHub.map((r, i) => (
          <Reveal key={r.name} delay={i * 40}>
            <a href={r.repo} target="_blank" rel="noopener noreferrer" className={styles.card}>
              <span className={`mono ${styles.name}`}>{r.name}</span>
              <span className={styles.note}>{r.note}</span>
              <span className={`mono ${styles.lang}`}>{r.lang}</span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
```

`src/components/MoreOnGitHub.module.css`:
```css
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--s-3); margin-top: var(--s-5); }
.card { display: flex; flex-direction: column; gap: 6px; padding: var(--s-4); border: 1px solid var(--border); border-radius: var(--radius); text-decoration: none; transition: border-color var(--dur) var(--ease), transform var(--dur) var(--ease); }
.card:hover { border-color: var(--accent); transform: translateY(-2px); }
.name { color: var(--text); font-size: 13px; }
.note { color: var(--muted-2); font-size: 12.5px; }
.lang { color: var(--muted); font-size: 11px; margin-top: auto; }
```

- [ ] **Step 5: Fill App**

In `src/App.tsx`: render `<MoreOnGitHub />` inside a new `<section id="more" className="section">` placed between `#journey` and `#contact`, and `<Contact />` inside `<section id="contact" className="section">`.

- [ ] **Step 6: Run tests** → `npm test` → PASS (whole suite).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add contact, footer, and more-on-github grid"
```

---

## Task 11: Résumé asset, favicon, SEO meta

**Files:**
- Create: `public/Jahin-Tazwar-Resume.pdf` (copy of `D:\Resume\Resume.pdf`), `public/favicon.svg`
- Modify: `index.html` (meta tags, favicon link)
- Test: `src/meta.test.ts`

**Interfaces:**
- Produces: correct document title, description, OpenGraph tags; résumé downloadable at `/Jahin-Tazwar-Resume.pdf`.

- [ ] **Step 1: Copy the résumé into public/**

```bash
mkdir -p /c/Portfolio/public
cp "/d/Resume/Resume.pdf" "/c/Portfolio/public/Jahin-Tazwar-Resume.pdf"
ls -la /c/Portfolio/public/
```

- [ ] **Step 2: Create favicon.svg**

`public/favicon.svg` (a "J" in accent green on ink):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#0e0f0d"/><text x="16" y="23" font-family="ui-monospace,monospace" font-size="20" font-weight="700" fill="#a8c16a" text-anchor="middle">J</text></svg>
```

- [ ] **Step 3: Write the failing test**

`src/meta.test.ts`:
```ts
import { readFileSync } from "node:fs";

test("index.html has accurate title and meta", () => {
  const html = readFileSync("index.html", "utf8");
  expect(html).toMatch(/<title>Jahin Tazwar[^<]*<\/title>/);
  expect(html).toMatch(/name="description"[^>]*content="[^"]*(compiler|language|chess|engineer)/i);
  expect(html).toMatch(/property="og:title"/);
  expect(html).toMatch(/favicon\.svg/);
  // stale template claim must be gone
  expect(html).not.toMatch(/Front End Web Developer/i);
});
```

- [ ] **Step 4: Run to verify it fails**

Run: `npm test -- meta.test` → FAIL.

- [ ] **Step 5: Update index.html `<head>`**

Replace the `<head>` contents with:
```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<title>Jahin Tazwar — Software Engineer</title>
<meta name="description" content="Jahin Tazwar — CS student and software engineer who builds systems from scratch: a programming language interpreter in C, a chess engine in C++, and AI tools. Chittagong, Bangladesh." />
<meta name="author" content="Jahin Tazwar" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Jahin Tazwar — Software Engineer" />
<meta property="og:description" content="I build the hard parts from scratch — a language, a chess engine — to actually understand them." />
```

- [ ] **Step 6: Run tests** → `npm test` → PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add résumé asset, favicon, and accurate SEO meta"
```

---

## Task 12: Netlify deploy config, build, accessibility + reduced-motion pass, README

**Files:**
- Create: `netlify.toml`, `README.md`
- Modify: any component needing an a11y/reduced-motion fix found during review

**Interfaces:**
- Produces: a production build that succeeds; deploy config for Netlify.

- [ ] **Step 1: Create netlify.toml**

`netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 2: Create README.md**

`README.md`:
```markdown
# Jahin Tazwar — Portfolio

Engineering-first personal portfolio. Vite + React + TypeScript, deployed on Netlify.

## Develop
    npm install
    npm run dev

## Test
    npm test

## Build
    npm run build     # outputs to dist/

## Content
All copy and links live in `src/data/` (`profile.ts`, `projects.ts`, `timeline.ts`).
Edit content there without touching layout. The résumé PDF is `public/Jahin-Tazwar-Resume.pdf`.
```

- [ ] **Step 3: Production build**

Run:
```bash
npm run build
```
Expected: build completes, `dist/` produced with no TypeScript errors.

- [ ] **Step 4: Accessibility + reduced-motion review**

Run `npm run dev` and verify manually:
- Tab through the page: nav links, all CTAs, project links, contact links are reachable with a visible green focus ring.
- Each `<section>` has a heading; nav anchors jump correctly.
- Toggle OS "reduce motion" (or DevTools → Rendering → Emulate `prefers-reduced-motion`): reveals appear instantly, caret and underline do not animate, smooth-scroll is off.
- Resize to 375px width: no horizontal scroll; hero, about, and work stack cleanly.

Fix any issue found (missing `alt`, low contrast, overflow) in the relevant component, re-run `npm test`.

- [ ] **Step 5: Final full test run**

Run `npm test`. Expected: entire suite PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add Netlify config, README, a11y + reduced-motion pass"
```

---

## Self-Review (completed by plan author)

**Spec coverage check** (spec §4 sections → tasks):
- Hero → Task 6 ✓ · Selected work (5 projects) → Task 7 + data Task 3 ✓ · Journey → Task 8 ✓ · About + tools → Task 9 ✓ · Contact → Task 10 ✓ · More on GitHub → Task 10 ✓
- Visual system (§3) → Tasks 2 + 4, applied via `frontend-design` in 5–11 ✓
- Motion + reduced-motion (§3) → Reveal/CodePanel (Task 4), underline (Task 6), global (Task 2), review (Task 12) ✓
- Tech/hosting (§5) → Tasks 1, 11, 12 ✓ · Résumé/CV → Tasks 3, 11 ✓ · SEO/meta → Task 11 ✓
- Client sites excluded → enforced by data test in Task 3 ✓
- Status reconciliation for NFA's Gambit → data marks "shipped"; verified visually in Task 12 ✓

**Placeholder scan:** No TBD/TODO/"handle edge cases"/"similar to Task N" — all steps carry real code. ✓

**Type consistency:** `Project`/`Milestone` types defined in Task 3 and consumed with identical field names in Tasks 7/8. `Reveal`, `Tag`, `StatusChip`, `CodePanel` signatures defined in Task 4 and used consistently in 6–10. `StatusChip.kind` is `"shipped" | "progress"`; `ProjectRow` maps any non-"progress" status to `"shipped"` so Calculator's "early work" label renders green. ✓

**Known follow-ups (non-blocking, from spec §7):** confirm exact live URLs while building; final copy/voice pass on Hero + About with Jahin; decide on phone number (currently excluded per Global Constraints).
