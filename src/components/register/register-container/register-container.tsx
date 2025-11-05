import React from 'react';
import styles from './register-container.module.css';

interface RegisterContainerProps {
    children: React.ReactNode;
    className?: string; // Add className prop
}

const RegisterContainer: React.FC<RegisterContainerProps> = ({ children, className }) => {
    return (
        <div className={`${styles.container} ${className || ''}`}>
            {children}
        </div>
    );
};

export default RegisterContainer;
