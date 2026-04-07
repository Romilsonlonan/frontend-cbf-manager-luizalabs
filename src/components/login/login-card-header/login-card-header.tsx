import React from 'react';
import styles from './login-card-header.module.css';

interface LoginCardHeaderProps {
    title: string;
    subtitle?: string;
    logoSrc?: string;
    logoAlt?: string;
    logoClassName?: string;
}

export function LoginCardHeader({ 
    title, 
    subtitle, 
    logoSrc, 
    logoAlt = 'Logo',
    logoClassName 
}: LoginCardHeaderProps) {
    return (
        <div className={styles.headerContainer}>
            {logoSrc && (
                <div className={styles.logoContainer}>
                    <img src={logoSrc} alt={logoAlt} className={`${styles.logo} ${logoClassName || ''}`} />
                </div>
            )}
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
    );
}
