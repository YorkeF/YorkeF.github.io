import type { ContactInfo } from '../types';
import styles from './Contact.module.css';

const CONTACT: ContactInfo = {
  email: 'yorke.ferrell@gmail.com',
  github: 'https://github.com/YorkeF',
};

export const Contact = () => (
  <main className="container">
    <section className={styles.section}>
      <h1 className={styles.title}>Contact</h1>
      <ul className={styles.list}>
        <li>
          <span className={styles.label}>Email</span>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </li>
        <li>
          <span className={styles.label}>GitHub</span>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            github.com/YorkeF
          </a>
        </li>
      </ul>
    </section>
  </main>
);
