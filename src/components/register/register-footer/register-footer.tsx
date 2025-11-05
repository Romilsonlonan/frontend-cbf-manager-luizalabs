import React from 'react';
import styles from './register-footer.module.css';

interface RegisterFooterProps {
    children: React.ReactNode;
    className?: string; // Add className prop
}

const RegisterFooter: React.FC<RegisterFooterProps> = ({ children, className }) => {
    return (
        <div className={`${styles.footer} ${className || ''}`}>
            {children}
        </div>
    );
};

export default RegisterFooter;
