import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <p>© {new Date().getFullYear()} Yorke Ferrell</p>
    </div>
  </footer>
);
