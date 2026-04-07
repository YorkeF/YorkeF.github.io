import { ExperienceList } from '../components';
import type { Experience } from '../types';
import styles from './Home.module.css';

const EXPERIENCES: Experience[] = [
  {
    id: 'paycom-fulltime',
    role: 'Full-Stack Software Developer',
    company: 'Paycom',
    location: 'Oklahoma City, OK',
    start: 'May 2025',
    end: 'March 2026',
    bullets: [
      'Designed and implemented performant MySQL queries against a database of 1M+ records, ensuring data integrity and minimal response time.',
      'Worked in a team of 16 developers to develop full-stack applications used by internal teams and external users to create and run background checks.',
      'Implemented and worked with RESTful APIs to bring in candidate info from a myriad of state court networks.',
      'Utilized Docker containers for application deployment, reducing deployment time and enabling seamless scalability.',
      'Worked developing a Background Checks dashboard to visualize and report completed and in-progress background checks.',
    ],
  },
  {
    id: 'infratie-fulltime',
    role: 'Django Full-Stack Developer',
    company: 'InfraTie',
    location: 'Stillwater, OK',
    start: 'August 2024',
    end: 'May 2025',
    bullets: [
      'Implemented Leaflet.js and other GIS libraries to render an interactive map of active work orders for visual maintenance assessment.',
      'Led monthly deployment of feature updates to an Apache server and migrated infrastructure to AWS, improving reliability and scalability.',
      'Designed and developed frontend styling of client-facing dashboards, streamlining user experience.',
      'Met directly with clients to gather requirements, communicate progress, and ensure delivered features aligned with operational needs.',
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
      'Worked on a team of 8 interns to develop an internal development tool for designers to upload Markdown documentation of components displayed as styled HTML pages.',
      'Recreated many existing PHP components into React to allow for seamless translation between the components.',
    ],
  },
  {
    id: 'infratie-intern',
    role: 'Django Backend Development Intern',
    company: 'InfraTie',
    location: 'Stillwater, OK',
    start: 'June 2023',
    end: 'May 2024',
    bullets: [
      'Developed a full-stack Django webapp to track work orders and ongoing maintenance across pipes, manholes, and other sewer assets.',
      'Implemented 100+ API endpoints in production.',
    ],
  },
  {
    id: 'osu-helpdesk',
    role: 'IT Helpdesk Phone Agent Team Lead',
    company: 'Oklahoma State University',
    location: 'Stillwater, OK',
    start: 'August 2021',
    end: 'May 2024',
    bullets: [
      'Provided technical support to students, faculty, and alumni, troubleshooting and resolving issues such as password resets and software glitches.',
      'Worked directly under the CIO to assist in the creation of forms and sites using SharePoint and MS Power Apps.',
      'Led a team of 8 employees, resolved escalated issues, and trained and on-boarded new employees.',
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
