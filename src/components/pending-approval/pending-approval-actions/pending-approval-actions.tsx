import React from 'react';
import { Button } from '@/components/ui/button';
import { PendingApprovalActionsProps } from '../types';
import styles from './pending-approval-actions.module.css';

const PendingApprovalActions: React.FC<PendingApprovalActionsProps> = ({ children }) => {
    return (
        <div className={styles.actions}>
            {children}
        </div>
    );
};

export default PendingApprovalActions;
