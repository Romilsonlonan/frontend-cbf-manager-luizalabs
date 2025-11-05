import React from 'react';
import styles from './login-error-message.module.css';

interface LoginErrorMessageProps {
    message: string | null;
}

export function LoginErrorMessage({ message }: LoginErrorMessageProps) {
    if (!message) {
        return null;
    }
    return (
        <p className={styles.errorMessage}>{message}</p>
    );
}
