import styles from "./Nav.module.css";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
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
