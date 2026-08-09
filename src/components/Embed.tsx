import styles from "./Embed.module.css";

export function Embed({ url, label }: { url: string; label: string }) {
  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  })();

  return (
    <figure className={styles.embed}>
      <div className={styles.bar}>
        <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
        <span className={`mono ${styles.url}`}>{host}</span>
        <a className={`mono ${styles.open}`} href={url} target="_blank" rel="noopener noreferrer">
          open ↗
        </a>
      </div>
      <div className={styles.frame}>
        <iframe src={url} title={`Live demo — ${host}`} loading="lazy" />
      </div>
      <figcaption className={styles.cap}>
        <span className={styles.live} aria-hidden="true" /> {label}
      </figcaption>
    </figure>
  );
}
