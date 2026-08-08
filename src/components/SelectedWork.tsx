import { featured } from "../data/projects";
import { ProjectRow } from "./ProjectRow";
import { Reveal } from "./Reveal";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  return (
    <div className="container">
      <h2 className="eyebrow">selected work</h2>
      <div className={styles.list}>
        {featured.map((p, i) => (
          <Reveal key={p.n} delay={i * 60}><ProjectRow project={p} /></Reveal>
        ))}
      </div>
    </div>
  );
}
