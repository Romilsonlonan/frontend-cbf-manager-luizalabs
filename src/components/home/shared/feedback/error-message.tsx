import React from 'react';
import { XCircle } from 'lucide-react';
import styles from './error-message.module.css';

interface ErrorMessageProps {
    message: string;
    className?: string;
}

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
    return (
        <div className={`${styles.errorMessageContainer} ${className}`}>
            <XCircle className={styles.icon} />
            <p className={styles.messageText}>{message}</p>
        </div>
    );
};
