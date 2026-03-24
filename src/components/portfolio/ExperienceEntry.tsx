import type { Experience } from '../../types';
import styles from './ExperienceEntry.module.css';

interface Props {
  experience: Experience;
}

export const ExperienceEntry = ({ experience }: Props) => (
  <article className={styles.entry}>
    <div className={styles.header}>
      <span className={styles.role}>{experience.role}</span>
      <span className={styles.date}>{experience.start} – {experience.end}</span>
    </div>
    <span className={styles.company}>{experience.company} · {experience.location}</span>
    <ul className={styles.bullets}>
      {experience.bullets.map((bullet, i) => (
        <li key={i}>{bullet}</li>
      ))}
    </ul>
  </article>
);
