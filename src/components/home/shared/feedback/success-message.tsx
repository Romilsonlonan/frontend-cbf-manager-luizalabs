import React from 'react';
import { CheckCircle } from 'lucide-react';
import styles from './success-message.module.css';

interface SuccessMessageProps {
    message: string;
    className?: string;
}

export const SuccessMessage = ({ message, className }: SuccessMessageProps) => {
    return (
        <div className={`${styles.successMessageContainer} ${className}`}>
            <CheckCircle className={styles.icon} />
            <p className={styles.messageText}>{message}</p>
        </div>
    );
};
