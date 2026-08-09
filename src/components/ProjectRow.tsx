import type { Project } from "../data/projects";
import { Tag } from "./Tag";
import { StatusChip } from "./StatusChip";
import { Embed } from "./Embed";
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
        {p.embed && <Embed url={p.embed.url} label={p.embed.label} />}
      </div>
    </article>
  );
}
