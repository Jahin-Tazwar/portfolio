import styles from "./primitives.module.css";

export function StatusChip({ label, kind }: { label: string; kind: "shipped" | "progress" }) {
  return <span className={styles.chip} data-kind={kind}>{label}</span>;
}
