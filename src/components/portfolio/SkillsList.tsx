import styles from './SkillsList.module.css';

interface Props {
  title: string;
  skills: string[];
}

export const SkillsList = ({ title, skills }: Props) => (
  <div className={styles.group}>
    <h3 className={styles.groupTitle}>{title}</h3>
    <ul className={styles.list}>
      {skills.map((skill) => (
        <li key={skill} className={styles.item}>{skill}</li>
      ))}
    </ul>
  </div>
);
