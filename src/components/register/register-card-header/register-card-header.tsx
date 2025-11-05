import React from 'react';
import styles from './register-card-header.module.css';

import { CardDescription, CardHeader } from '@/components/ui/card'; // Assuming these are shadcn/ui components

interface RegisterCardHeaderProps {
    title: string;
    subtitle?: string;
    logoSrc?: string;
    logoAlt?: string;
    className?: string; // Add className prop for the header div
    logoClassName?: string; // Add className prop for the logo img
    logoContainerClassName?: string; // Add className prop for the logo container div
    titleClassName?: string; // Add className prop for the title h2
}

const RegisterCardHeader: React.FC<RegisterCardHeaderProps> = ({
    title,
    subtitle,
    logoSrc,
    logoAlt,
    className,
    logoClassName,
    logoContainerClassName,
    titleClassName
}) => {
    return (
        <CardHeader className={`${styles.header} ${className || ''}`}>
            {logoSrc && logoAlt && (
                <div className={`${styles.logoContainer} ${logoContainerClassName || ''}`}>
                    <img src={logoSrc} alt={logoAlt} className={`${styles.logo} ${logoClassName || ''}`} />
                </div>
            )}
            <CardDescription className={`${styles.title} ${titleClassName || ''}`}>{title}</CardDescription>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </CardHeader>
    );
};

export default RegisterCardHeader;
