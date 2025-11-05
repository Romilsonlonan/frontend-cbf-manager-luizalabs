import React from 'react';
import styles from './pending-approval-status.module.css';

interface PendingApprovalStatusProps {
    status: string;
}

const PendingApprovalStatus: React.FC<PendingApprovalStatusProps> = ({ status }) => {
    return (
        <div className={styles.statusContainer}>
            <p className={styles.statusText}>Status: <span className={styles.statusValue}>{status}</span></p>
        </div>
    );
};

export default PendingApprovalStatus;
