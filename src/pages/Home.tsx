import { ExperienceList } from '../components';
import type { Experience } from '../types';
import styles from './Home.module.css';

const EXPERIENCES: Experience[] = [
  {
    id: 'paycom-sde3',
    role: 'Software Developer III',
    company: 'Paycom',
    location: 'Oklahoma City, OK',
    start: 'May 2025',
    end: 'Present',
    bullets: [
      'Developed full-stack applications for creating and running background checks used by internal teams and external users.',
      'Implemented RESTful APIs integrating candidate info from state court networks and external data sources.',
      'Designed performant MySQL queries against a database of 1M+ records.',
      'Utilized Docker containers for deployment, reducing deployment time and enabling scalability.',
      'Built a Background Checks dashboard to visualize and report completed and in-progress checks.',
    ],
  },
  {
    id: 'infratie',
    role: 'Django Full-Stack Developer',
    company: 'InfraTie',
    location: 'Stillwater, OK',
    start: 'June 2023',
    end: 'May 2025',
    bullets: [
      'Built a Django webapp to track work orders and maintenance across sewer pipes and manholes.',
      'Implemented an interactive map using Leaflet.js and GIS libraries to visualize active work orders.',
      'Designed client-facing dashboards and implemented 100+ API endpoints in production.',
      'Managed monthly Apache server deployments with minimal client downtime.',
    ],
  },
  {
    id: 'paycom-intern',
    role: 'Software Development Intern',
    company: 'Paycom',
    location: 'Oklahoma City, OK',
    start: 'May 2024',
    end: 'August 2024',
    bullets: [
      'Developed an internal tool for designers to upload Markdown documentation rendered as styled HTML pages.',
      'Migrated existing PHP components to React for seamless component translation.',
    ],
  },
];

export const Home = () => (
  <main className="container">
    <section className={styles.hero}>
      <h1 className={styles.name}>Yorke Ferrell</h1>
      <p className={styles.tagline}>Software Developer</p>
      <p className={styles.summary}>
        Full-stack engineer with experience in Django, React, and PHP — building
        production web apps at Paycom and scaling infrastructure for GIS-based
        sewer management at InfraTie.
      </p>
    </section>

    <section>
      <h2 className={styles.sectionTitle}>Experience</h2>
      <ExperienceList experiences={EXPERIENCES} />
    </section>
  </main>
);
