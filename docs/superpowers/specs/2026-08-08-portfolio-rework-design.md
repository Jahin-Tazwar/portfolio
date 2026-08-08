# Portfolio Rework — Design Spec

**Author:** Jahin Tazwar
**Date:** 2026-08-08
**Status:** Approved (design), pending implementation plan

---

## 1. Purpose

Completely rework Jahin Tazwar's personal portfolio. The existing site (`C:\Portfolio`,
plain HTML/CSS/JS from a template, Dec 2024) positions him as a "frontend developer, still
learning, 2 projects" with placeholder testimonials and generic template work cards. It
badly undersells who he is now.

The new site is an **engineering-first personal portfolio** that tells a true story: a
first-term Computer Science student at CUET who has already built and shipped a
programming language and a chess engine from scratch, both compiled to WebAssembly and
running in the browser.

### Goals
- Present Jahin as a serious systems-minded software engineer, not a "still learning" junior.
- Tell his real story/journey (curiosity → self-taught building → shipping real systems → CUET).
- Showcase curated, real projects with honest writeups and live demos.
- Feel **human and authored** — driven by real content (his code, his words, honest status),
  not manufactured personality.
- Serve as a recruiter- and peer-credible home base with clear contact + résumé.

### Non-goals
- No client/agency work featured (restaurant, barbershop, plumbing sites are excluded by
  explicit request).
- No manufactured "personality" quirks (no fake "now playing / coffees today" strips, no
  status badges invented for flavor). Human feeling comes from truth, not props.
- No progress-bar skill meters or template tropes (gradient blobs, testimonials, generic
  "services I offer").
- No blog/CMS in this iteration.

---

## 2. Audience & positioning

Primary framing decided by the user: **all three audiences, engineering-first** —
- Prospective employers / internships (primary emphasis),
- Potential collaborators/peers,
- Anyone reading his story.

**Positioning line:** *"I build the hard parts from scratch — a language, a chess engine —
to actually understand them."*

The point of view is grounded in his own README line, which becomes a thesis for the whole
site:
> "Every line of engine and GUI code is hand-written — no AI-generated or copy-pasted logic."

---

## 3. Visual & interaction system

Modeled on the calm, content-first feel of the reference the user liked
(`arik.kodaic.io`), but darker and unmistakably his.

### Palette (warm ink)
- Background: warm near-black (approx `#0e0f0d`).
- Surface/panels: slightly darker/offset (approx `#0a0b09`), hairline borders `rgba(255,255,255,.07–.09)`.
- Text: warm cream (approx `#e9e6da`); muted text (approx `#8f8b7e` / `#a5a091`).
- **Single signal accent: muted phosphor-green** (approx `#a8c16a`) — used sparingly: code
  keywords, the hand-drawn underline, active/hover states, status chips.
- Secondary status color (amber, approx `#c9a45e`) only for "in progress" chips.
- Faint engineering grid overlay behind hero (very low-opacity ruled lines, ~30px cells).
  Static or extremely subtle — never floating gradient blobs.

### Typography
- Headlines: a strong grotesk / system-ui bold, tight tracking.
- Body: system-ui / clean sans.
- Code, labels, meta, tags, section eyebrows: monospace.
- Hierarchy comes primarily from size and weight, not color.

### Motion (purposeful only)
- Scroll-reveal (short, snappy rise-in) on sections and cards.
- Hand-drawn SVG underline that draws itself under a key hero word.
- Live blinking caret in the hero code panel.
- Hero code panel may "type itself" on load (progressive enhancement; full code shown if JS
  is off/not run).
- Timeline draws/reveals itself as the user scrolls.
- Hover lifts on project rows/cards.
- All motion respects `prefers-reduced-motion` (reveal-in becomes instant; drifting/typing
  disabled).

### Layout
- Single page, scroll-driven, single primary column with generous whitespace.
- Hero uses a two-column split on desktop (words left, real code panel right); stacks on mobile.
- Fully responsive; mobile-first; no horizontal overflow.

---

## 4. Page structure & content

Single-page scroll. Sticky/minimal top nav: `work · about · journey · contact`.

### 4.1 Hero
- Eyebrow (mono): e.g. `// software, written from scratch`.
- Headline with the hand-drawn "by hand" underline mark.
- Subhead grounded in truth: CS student; currently a language in C and a chess engine in
  C++; "no framework is doing the hard part for me."
- CTAs: **Read the work →** and **Résumé** (PDF). Secondary: GitHub, LinkedIn.
- Real code panel: the actual `factorial` function from NFA (recursive, no `return`
  keyword), labeled as his language. Live caret.

### 4.2 Selected work (curated: 5)
Each entry: number, title, one-to-two-sentence true writeup, tech tags (mono), honest status
chip, and links (live demo + GitHub). Writeups sourced from the résumé and each repo's real
README (to be pulled during implementation).

| # | Project | Hook (from résumé/README) | Tech | Live | Repo |
|---|---------|---------------------------|------|------|------|
| 01 | **NFA — programming language & interpreter** | Hand-written lexer, recursive-descent parser, AST, tree-walking evaluator, block-scoped symbol table in C; variables/arrays/strings/loops/built-ins; native CLI + interactive REPL from one shared runtime core; compiled to WASM (Emscripten) so it runs entirely client-side, leak-free. | C, WebAssembly (Emscripten), JS | nfa-lang.netlify.app | github.com/Jahin-Tazwar/NFA |
| 02 | **NFA's Gambit — chess engine** | Full engine: legal move generation, board representation, positional evaluation, GUI (raylib). Minimax + alpha-beta pruning + iterative deepening; modern C++17 (RAII, smart pointers, OO piece hierarchy), multithreaded search; ported to WASM for in-browser play. | C++17, Multithreading, WASM, CMake | nfa-gambit.netlify.app | github.com/Jahin-Tazwar/NFA-Gambit |
| 03 | **Repo Explainer — AI codebase analysis** | Ingests any public GitHub repo and generates consistent, developer-readable explanations of its architecture, module layout, and functionality; analysis + prompt pipeline reduces onboarding from hours to a single pass. | JavaScript, React, Node.js, LLM APIs | repodecode.netlify.app | Repo-Decoder-FE / Repo-Decoder-BE |
| 04 | **CUET Lab — AI-driven educational platform** | Deployed platform hosting virtual lab simulations and course resources, centralizing materials previously scattered across sources for a full cohort. | React, JavaScript, HTML/CSS | cuet-lab.netlify.app | github.com/Jahin-Tazwar/Lab-CUET |
| 05 | **Calculator (FE + BE)** | Early full-stack piece included to show where he started — deliberate "before" reference against the systems work. | TypeScript / JS, deployed FE + BE | calculator-be.vercel.app | Calculator-FE / Calculator-BE |

Notes:
- **Status reconciliation:** résumé states NFA's Gambit's Minimax AI is implemented; the
  GitHub README still says "in progress." Present it as **shipped/playable** per the résumé;
  verify against the live demo during implementation and adjust the chip if needed.
- Live-demo links open in a new tab; every card links to source.

### 4.3 The journey (timeline, story-forward)
Real milestones, rendered as a clean dated vertical timeline that reveals on scroll:
- **~2020–2021** — Started coding out of curiosity; got hooked after watching a developer
  build cool things.
- **2023** — SSC (Chittagong Government High School), GPA 5.00/5.00.
- **2025** — HSC (Government City College, Chittagong), GPA 5.00/5.00; deep in self-driven
  building.
- **Pre-uni → 2026** — Took four software projects from concept to publicly deployed product
  (systems programming, compilers, AI tooling, full-stack web).
- **2026** — Began **CUET, B.Sc. CSE (Level 1, Term 1)**. Took part in the **BUILD@CUET**
  speedathon → speech-analyzer, multi-role-market, and n8n workflows.
- **Ongoing** — CodeChef competitive rating **1279**, regular algorithmic practice. Expected
  graduation **2030**.

### 4.4 About (first-person, story-forward)
A genuine first-person narrative (warm, terse, matching his README voice — technical, a
little dry, honest). Arc: copying templates → discovering how software works underneath →
the NFA project as the turning point → why systems/compilers pull him → honest first-year-
student energy and what's next. Ends with the hand-written/no-shortcuts ethos.

"Tools I reach for" (woven in, not metered):
- Languages: C, C++ (C++17), JavaScript/TypeScript, SQL.
- Web & data: React, Node.js, Express, REST APIs, PostgreSQL, MongoDB, SQLite.
- Systems/tools: WebAssembly (Emscripten), CMake, Git/GitHub, Linux, VS Code.
- Concepts: Data structures & algorithms, compiler/interpreter design, OOP, multithreading,
  memory management, performance optimization.

### 4.5 Contact
Minimal: email (`tazwarjahin@gmail.com`), GitHub (`github.com/Jahin-Tazwar`), LinkedIn
(`linkedin.com/in/jahin-tazwar`), and Résumé (PDF). Optional phone from résumé
(`+880 1318 375497`) — include only if the user wants it public. No contact form (the old
Netlify form is dropped).

### 4.6 "More on GitHub" (compact grid)
Small cards for non-featured public repos worth showing (e.g. speech-analyzer, Hishab-AI,
multi-role-market, pulsemeet, social, news-scraper) — name, one-line, language, link. Keeps
the featured set focused while showing breadth. Client sites remain excluded.

---

## 5. Technical architecture

- **Stack:** Vite + React + TypeScript.
- **Styling:** CSS approach chosen at planning time (CSS Modules or a single design-token
  stylesheet); design tokens (colors, spacing, type scale, motion durations) centralized so
  the visual system is defined once.
- **Structure:** Component per section (`Hero`, `SelectedWork`/`ProjectRow`, `Journey`/
  `TimelineItem`, `About`, `Contact`, `MoreOnGitHub`, `Nav`, `Footer`), plus small shared
  primitives (`Reveal` wrapper for scroll animation, `Tag`, `StatusChip`, `CodePanel`).
- **Content as data:** projects, timeline entries, and links live in typed data modules
  (e.g. `src/data/projects.ts`, `src/data/timeline.ts`) so content edits never touch layout.
  All content is curated/static (no runtime GitHub API calls).
- **Assets:** résumé PDF copied into the site (e.g. `public/Jahin-Tazwar-Resume.pdf`) and
  linked as the CV download. Favicon/logo updated.
- **Motion:** lightweight (CSS animations + IntersectionObserver for reveals); avoid heavy
  animation libraries unless a specific effect needs one.
- **Accessibility:** semantic landmarks, keyboard-navigable, visible focus states, adequate
  contrast on the ink palette, `prefers-reduced-motion` honored, `alt` text on imagery.
- **SEO/meta:** accurate title/description/OpenGraph replacing the stale "Front End Web
  Developer" meta; sitemap updated.
- **Hosting:** Netlify (matches all his live projects). Old template assets/scripts
  (Swiper, MixItUp, ScrollReveal, boxicons) are removed.

---

## 6. Success criteria

- The site reads as an engineering portfolio by a capable systems-minded student, not a
  "still learning" junior.
- A visitor understands, within the hero, that he built a language and a chess engine.
- Every project writeup is true (traceable to résumé/README), with working demo + source links.
- The journey/timeline conveys the real arc with real dates.
- It does not read as AI-generated: no manufactured quirks, no template tropes; content is
  specific and his.
- Fully responsive, accessible, and honors reduced-motion.
- Résumé is one click away.

---

## 7. Open items to resolve during implementation

- Pull each featured repo's real README for precise writeups; confirm exact live URLs.
- Verify NFA's Gambit AI status against the live demo (chip = shipped vs in-progress).
- Confirm whether to publish the phone number.
- Decide final CSS strategy (tokens/modules) and whether any reveal needs a library.
- Final copy pass on Hero, About, and per-project blurbs (Jahin to review voice).

---

_Note: `C:\Portfolio` is not a git repository, so this spec is not committed. Recommend
`git init` before implementation so work is tracked._
