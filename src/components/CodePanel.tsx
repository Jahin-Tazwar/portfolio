import type { ReactNode } from "react";
import styles from "./primitives.module.css";

const KEYWORDS = new Set(["fn", "let", "if", "else", "while", "return"]);

/** Lightweight highlighter for NFA source — keywords, calls, numbers, comments. */
function tokenize(code: string): ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, li) => {
    const ci = line.indexOf("//");
    const codePart = ci >= 0 ? line.slice(0, ci) : line;
    const comment = ci >= 0 ? line.slice(ci) : "";

    const toks: ReactNode[] = [];
    const re = /(\s+)|([A-Za-z_]\w*)|(\d+)|(.)/g;
    let m: RegExpExecArray | null;
    let k = 0;
    while ((m = re.exec(codePart)) !== null) {
      const [, ws, ident, num, other] = m;
      if (ws) toks.push(ws);
      else if (ident) {
        if (KEYWORDS.has(ident)) toks.push(<span key={k++} style={{ color: "var(--syn-key)" }}>{ident}</span>);
        else if (codePart[re.lastIndex] === "(") toks.push(<span key={k++} style={{ color: "var(--syn-fn)" }}>{ident}</span>);
        else toks.push(ident);
      } else if (num) toks.push(<span key={k++} style={{ color: "var(--syn-num)" }}>{num}</span>);
      else toks.push(other);
    }

    return (
      <span key={li}>
        {toks}
        {comment && <span style={{ color: "var(--syn-com)" }}>{comment}</span>}
        {li < lines.length - 1 ? "\n" : ""}
      </span>
    );
  });
}

export function CodePanel({
  filename,
  code,
  highlight = false,
}: {
  filename: string;
  code: string;
  highlight?: boolean;
}) {
  return (
    <div className={styles.codePanel}>
      <div className={styles.codeHeader}>
        <span className={styles.dot} aria-hidden="true" />
        <span className="mono">{filename}</span>
      </div>
      <pre className={styles.codeBody}>
        <code>{highlight ? tokenize(code) : code}</code>
        <span className={styles.caret} aria-hidden="true" />
      </pre>
    </div>
  );
}
