import React from 'react';
import styles from './register-card.module.css';

import { Card } from '@/components/ui/card'; // Assuming Card is a shadcn/ui component

interface RegisterCardProps {
    children: React.ReactNode;
    className?: string; // Add className prop
}

const RegisterCard: React.FC<RegisterCardProps> = ({ children, className }) => {
    return (
        <Card className={`${styles.card} ${className || ''}`}>
            {children}
        </Card>
    );
};

export default RegisterCard;
