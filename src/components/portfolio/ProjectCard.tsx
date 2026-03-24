import type { Project } from '../../types';
import styles from './ProjectCard.module.css';

interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => (
  <article className={styles.card}>
    <h3 className={styles.title}>
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        {project.title}
      </a>
    </h3>
    <p className={styles.description}>{project.description}</p>
    <ul className={styles.tags}>
      {project.technologies.map((tech) => (
        <li key={tech} className={styles.tag}>{tech}</li>
      ))}
    </ul>
  </article>
);
