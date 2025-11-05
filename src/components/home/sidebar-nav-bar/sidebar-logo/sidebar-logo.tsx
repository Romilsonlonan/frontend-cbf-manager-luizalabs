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
        className="shrink-0 rounded-full"
        style={{ objectFit: 'contain' }}
      />
      <h1 className={styles.logoTitle} style={{ color: 'var(--sidebar-text-color)' }}>CBF Manager</h1>
    </div>
  );
}
