import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './loading-overlay.module.css';

interface LoadingOverlayProps {
    isLoading: boolean;
    message?: string;
}

export const LoadingOverlay = ({ isLoading, message = 'Carregando...' }: LoadingOverlayProps) => {
    if (!isLoading) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.content}>
                <Loader2 className={styles.spinner} />
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
};
