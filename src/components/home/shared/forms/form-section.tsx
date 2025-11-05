import React, { ReactNode } from 'react';
import styles from './form-section.module.css';

type FormSectionProps = {
    title: string;
    description?: string;
    children: ReactNode;
};

export const FormSection = ({ title, description, children }: FormSectionProps) => {
    return (
        <div className={styles.formSectionContainer}>
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
            <div className={styles.content}>{children}</div>
        </div>
    );
};
