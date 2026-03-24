import { Navigation } from './Navigation';
import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <div className={`container ${styles.inner}`}>
      <span className={styles.logo}>Yorke Ferrell</span>
      <Navigation />
    </div>
  </header>
);
