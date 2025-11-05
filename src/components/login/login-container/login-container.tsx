import React from 'react';
import styles from './login-container.module.css';

interface LoginContainerProps {
    children: React.ReactNode;
}

export function LoginContainer({ children }: LoginContainerProps) {
    return (
        <div className={styles.loginContainer}>
            {children}
        </div>
    );
}
