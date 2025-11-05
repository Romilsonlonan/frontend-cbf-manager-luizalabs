import React from 'react';
import styles from './register-form.module.css';

interface RegisterFormProps {
    children: React.ReactNode;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
    className?: string; // Add className prop
}

const RegisterForm: React.FC<RegisterFormProps> = ({ children, onSubmit, className }) => {
    return (
        <form className={`${styles.form} ${className || ''}`} onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default RegisterForm;
