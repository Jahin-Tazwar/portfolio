import { profile } from "../data/profile";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <div className="container">
      <p className="eyebrow">contact</p>
      <h2 className={styles.title}>Building something, or hiring for it? Say hi.</h2>
      <div className={styles.links}>
        <a href={`mailto:${profile.email}`} className="mono">{profile.email}</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="mono">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="mono">LinkedIn</a>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="mono">Résumé ↗</a>
      </div>
      <p className={styles.copy}>© {new Date().getFullYear()} Jahin Tazwar · Chittagong, Bangladesh</p>
    </div>
  );
}
