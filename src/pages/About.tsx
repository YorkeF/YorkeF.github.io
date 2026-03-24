import { SkillsList, EducationList } from '../components';
import type { Education } from '../types';
import styles from './About.module.css';

const EDUCATION: Education[] = [
  {
    id: 'osu',
    degree: 'BS in Computer Science',
    school: 'Oklahoma State University',
    date: 'c/o May 2025',
    detail: 'Minor in Management Information Systems',
  },
  {
    id: 'francis-tuttle',
    degree: 'Computer Science Academy',
    school: 'Francis Tuttle Technology Center',
    date: 'August 2018 – May 2021',
    detail: 'Three-year preparatory course covering Computer Science in Java, C#, and Python.',
  },
];

export const About = () => (
  <main className="container">
    <section className={styles.section}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.bio}>
        I'm a full-stack software developer based in Oklahoma. I graduated from
        Oklahoma State University with a BS in Computer Science (Minor in MIS) in
        May 2025. I enjoy building web applications that are fast, reliable, and
        easy to use — from GIS dashboards to high-volume background check systems.
      </p>
    </section>

    <section className={styles.section}>
      <h2 className={styles.subtitle}>Education</h2>
      <EducationList educations={EDUCATION} />
    </section>

    <section className={styles.section}>
      <h2 className={styles.subtitle}>Skills</h2>
      <SkillsList
        title="Languages"
        skills={['Python', 'PHP', 'TypeScript', 'Java', 'HTML/CSS', 'MySQL', 'Bash']}
      />
      <SkillsList
        title="Technologies"
        skills={['Django', 'React', 'Next.js', 'GraphQL', 'Node', 'AWS', 'Docker', '.NET Core', 'Apache', 'Git']}
      />
    </section>
  </main>
);
