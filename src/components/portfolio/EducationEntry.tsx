import type { Education } from '../../types';
import styles from './EducationEntry.module.css';

interface Props {
  education: Education;
}

export const EducationEntry = ({ education }: Props) => (
  <article className={styles.entry}>
    <div className={styles.header}>
      <span className={styles.degree}>{education.degree}</span>
      <span className={styles.date}>{education.date}</span>
    </div>
    <span className={styles.school}>{education.school}</span>
    {education.detail && <p className={styles.detail}>{education.detail}</p>}
  </article>
);
