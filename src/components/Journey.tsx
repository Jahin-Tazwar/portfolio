import { timeline } from "../data/timeline";
import { Reveal } from "./Reveal";
import styles from "./Journey.module.css";

export function Journey() {
  return (
    <div className="container">
      <h2 className="eyebrow">the journey</h2>
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
