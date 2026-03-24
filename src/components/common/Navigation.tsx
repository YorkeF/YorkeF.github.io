import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export const Navigation = () => (
  <nav className={styles.nav}>
    <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
    <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''}>About</NavLink>
    <NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : ''}>Contact</NavLink>
  </nav>
);
