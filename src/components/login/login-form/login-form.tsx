import React from 'react';
import styles from './login-form.module.css';

interface LoginFormProps {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({ children, onSubmit }: LoginFormProps) {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            {children}
        </form>
    );
}
