import styles from "./Embed.module.css";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function Embed({ url, label }: { url: string; label: string }) {
  // Live iframes are cramped and hard to use on touch/small screens — offer a
  // launch card there instead of an embed that "won't function properly."
  const isSmall = useMediaQuery("(max-width: 768px)");

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

      {isSmall ? (
        <a className={styles.launch} href={url} target="_blank" rel="noopener noreferrer">
          <span className={styles.play} aria-hidden="true">▶</span>
          <span className={styles.launchText}>Open the live demo</span>
          <span className={styles.launchHint}>It&rsquo;s interactive — best on a bigger screen ↗</span>
        </a>
      ) : (
        <div className={styles.frame}>
          <iframe src={url} title={`Live demo — ${host}`} loading="lazy" />
        </div>
      )}

      <figcaption className={styles.cap}>
        <span className={styles.live} aria-hidden="true" /> {label}
      </figcaption>
    </figure>
  );
}
