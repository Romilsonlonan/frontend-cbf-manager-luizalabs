import React from 'react';
import { Card } from '@/components/ui/card';
import { PendingApprovalCardProps } from '../types';
import styles from './pending-approval-card.module.css';

const PendingApprovalCard: React.FC<PendingApprovalCardProps> = ({ children }) => {
    return (
        <Card className={styles.card}>
            {children}
        </Card>
    );
};

export default PendingApprovalCard;
