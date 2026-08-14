import styles from "./Nav.module.css";

const links = [
  { id: "work", label: "work" },
  { id: "about", label: "about" },
  { id: "journey", label: "journey" },
  { id: "contact", label: "contact" },
];

export function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={`mono ${styles.logo}`}>Jahin Tazwar</a>
        <nav className={styles.links} aria-label="Primary">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="mono">{l.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
