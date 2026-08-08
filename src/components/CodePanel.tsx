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
