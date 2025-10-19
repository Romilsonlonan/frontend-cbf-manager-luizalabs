
'use client';

import Image from 'next/image';
import styles from './sidebar-logo.module.css';

export function SidebarLogo() {
  return (
    <div className={styles.logoContainer}>
      <Image
        src="https://i.ibb.co/WWx6qgWF/cbf.png"
        width={40}
        height={40}
        alt="CBF Logo"
        className={styles.logoImage}
      />
      <h1 className={styles.logoTitle}>CBF Manager</h1>
    </div>
  );
}
