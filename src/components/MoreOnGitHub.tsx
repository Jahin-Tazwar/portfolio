import { moreOnGitHub } from "../data/projects";
import { Reveal } from "./Reveal";
import styles from "./MoreOnGitHub.module.css";

export function MoreOnGitHub() {
  return (
    <div className="container">
      <h2 className="eyebrow" data-n="04">more on github</h2>
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
