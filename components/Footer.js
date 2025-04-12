'use client';

import { useTheme } from '../context/ThemeContext';
import styles from '../styles/Home.module.css';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`${styles.footer} ${isDark ? styles.footerDark : styles.footerLight}`}
    >
      <div className={styles.footerContent}>
        <p>© 2025 Wren Portfolio. Built with React and Next.js.</p>
      </div>
    </footer>
  );
}
