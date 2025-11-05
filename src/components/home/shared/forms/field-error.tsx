import React from 'react';
import styles from './field-error.module.css';

type FieldErrorProps = {
    message: string | null;
};

export const FieldError = ({ message }: FieldErrorProps) => {
    if (!message) return null;
    return <p className={styles.errorMessage}>{message}</p>;
};
