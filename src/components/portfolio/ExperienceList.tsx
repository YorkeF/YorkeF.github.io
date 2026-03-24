import type { Experience } from '../../types';
import { ExperienceEntry } from './ExperienceEntry';
import styles from './ExperienceList.module.css';

interface Props {
  experiences: Experience[];
}

export const ExperienceList = ({ experiences }: Props) => (
  <div className={styles.list}>
    {experiences.map((exp) => (
      <ExperienceEntry key={exp.id} experience={exp} />
    ))}
  </div>
);
