import React from 'react';
import { PendingApprovalIconProps } from '../types';
import styles from './pending-approval-icon.module.css';

const PendingApprovalIcon: React.FC<PendingApprovalIconProps> = ({ icon: Icon }) => {
    return (
        <div className={styles.iconContainer}>
            <Icon className={styles.icon} />
        </div>
    );
};

export default PendingApprovalIcon;
