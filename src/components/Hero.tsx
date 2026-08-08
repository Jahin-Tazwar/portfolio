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
