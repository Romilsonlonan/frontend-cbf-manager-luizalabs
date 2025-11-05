import React from 'react';
import { CardContent } from '@/components/ui/card';
import { PendingApprovalContentProps } from '../types';
import styles from './pending-approval-content.module.css';

const PendingApprovalContent: React.FC<PendingApprovalContentProps> = ({ children }) => {
    return (
        <CardContent className={styles.content}>
            {children}
        </CardContent>
    );
};

export default PendingApprovalContent;
