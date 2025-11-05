import React from 'react';
import styles from './account-type-card.module.css';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AccountTypeCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
    className?: string;
    headerClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    iconClassName?: string;
    buttonClassName?: string;
}

const AccountTypeCard: React.FC<AccountTypeCardProps> = ({
    title,
    description,
    icon,
    onClick,
    className,
    headerClassName,
    titleClassName,
    descriptionClassName,
    iconClassName,
    buttonClassName
}) => {
    return (
        <Card className={`${styles.card} ${className || ''}`}>
            <CardHeader className={`${styles.header} ${headerClassName || ''}`}>
                <div className={`${styles.icon} ${iconClassName || ''}`}>{icon}</div>
                <CardTitle className={`${styles.title} ${titleClassName || ''}`}>{title}</CardTitle>
                <CardDescription className={`${styles.description} ${descriptionClassName || ''}`}>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={onClick} className={`${styles.button} ${buttonClassName || ''}`}>
                    Select
                </Button>
            </CardContent>
        </Card>
    );
};

export default AccountTypeCard;
