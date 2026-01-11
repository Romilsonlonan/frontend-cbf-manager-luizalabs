import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>CBF Manager - A paixão do futebol em dados</p>
      <div className={styles.links}>
        <a href="/privacy" className={styles.link}>Privacidade</a>
        <a href="/terms" className={styles.link}>Termos</a>
        <a href="/contact" className={styles.link}>Contato</a>
      </div>
    </footer>
  );
};
