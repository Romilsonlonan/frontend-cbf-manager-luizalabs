import React from 'react';
import styles from './login-card-header.module.css';

interface LoginCardHeaderProps {
    title: string;
    subtitle: string;
}

export function LoginCardHeader({ title, subtitle }: LoginCardHeaderProps) {
    return (
        <div className={styles.headerContainer}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
        </div>
    );
}
