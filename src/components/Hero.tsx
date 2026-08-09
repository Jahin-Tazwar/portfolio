import { profile } from "../data/profile";
import { CodePanel } from "./CodePanel";
import { Reveal } from "./Reveal";
import styles from "./Hero.module.css";

const badges = ["C", "C++", "TypeScript", "React", "WebAssembly"];
const stats = [
  { n: "04", l: "products shipped" },
  { n: "02", l: "systems from scratch" },
  { n: "1279", l: "CodeChef rating" },
  { n: "2030", l: "CUET · expected grad" },
];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <Reveal>
            <p className="eyebrow" data-n="00">software, written from scratch</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 id="hero-heading" className={styles.headline}>
              I build languages, engines,<br />and tools{" "}
              <span className={styles.mark}>
                by hand
                <svg className={styles.underline} viewBox="0 0 200 14" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path d="M3 8C46 3 128 3 197 7" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              .
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className={styles.sub}>
              Computer science student at CUET. Right now: a programming language written in C
              and a chess engine in C++ — both compiled to WebAssembly and running in your browser.
              No framework does the hard part for me.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <ul className={styles.badges} aria-label="Core stack">
              {badges.map((b) => (
                <li key={b} className={styles.badge}>{b}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={340}>
            <div className={styles.ctas}>
              <a href="#work" className={styles.primary}>See the work <span aria-hidden="true">↓</span></a>
              <a href={profile.resume} className={styles.secondary} target="_blank" rel="noopener noreferrer">Résumé</a>
              <a href={profile.github} className={styles.textlink} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={profile.linkedin} className={styles.textlink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className={styles.panelWrap}>
            <CodePanel filename="factorial.nfa" code={profile.heroCode} highlight />
            <a className={styles.runHint} href="#work">
              <span className={styles.runDot} aria-hidden="true" />
              this language actually runs — try it below
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className={`container ${styles.stats}`}>
          {stats.map((s) => (
            <div key={s.l} className={styles.stat}>
              <div className={styles.statN}>{s.n}</div>
              <div className={styles.statL}>{s.l}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
