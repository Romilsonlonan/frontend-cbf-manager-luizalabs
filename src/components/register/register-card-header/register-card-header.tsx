import React from 'react';
import styles from './register-card-header.module.css';

import { CardHeader } from '@/components/ui/card';

interface RegisterCardHeaderProps {
    title: string;
    subtitle?: string;
    logoSrc?: string;
    logoAlt?: string;
    className?: string;
    logoClassName?: string;
    logoContainerClassName?: string;
    titleClassName?: string;
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
            <div className={`${styles.title} ${titleClassName || ''}`} style={{ whiteSpace: 'pre-line' }}>
                {title}
            </div>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </CardHeader>
    );
};

export default RegisterCardHeader;
