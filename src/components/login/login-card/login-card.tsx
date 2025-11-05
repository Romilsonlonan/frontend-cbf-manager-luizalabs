import React from 'react';
import styles from './login-card.module.css';

interface LoginCardProps {
    children: React.ReactNode;
}

export function LoginCard({ children }: LoginCardProps) {
    return (
        <div className={styles.loginCard}>
            {children}
        </div>
    );
}
