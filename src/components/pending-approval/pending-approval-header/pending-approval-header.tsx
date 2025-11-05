import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PendingApprovalHeaderProps } from '../types';
import styles from './pending-approval-header.module.css';

const PendingApprovalHeader: React.FC<PendingApprovalHeaderProps> = ({ title, description }) => {
    return (
        <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>{title}</CardTitle>
            <CardDescription className={styles.description}>{description}</CardDescription>
        </CardHeader>
    );
};

export default PendingApprovalHeader;
