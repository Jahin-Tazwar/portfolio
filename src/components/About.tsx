import { profile } from "../data/profile";
import { Reveal } from "./Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <div className="container">
      <h2 className="eyebrow" data-n="02">about</h2>
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
