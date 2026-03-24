import type { Education } from '../../types';
import { EducationEntry } from './EducationEntry';
import styles from './EducationList.module.css';

interface Props {
  educations: Education[];
}

export const EducationList = ({ educations }: Props) => (
  <div className={styles.list}>
    {educations.map((edu) => (
      <EducationEntry key={edu.id} education={edu} />
    ))}
  </div>
);
