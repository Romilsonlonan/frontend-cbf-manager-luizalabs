import React from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import styles from './pending-approval-button.module.css';

interface PendingApprovalButtonProps {
    href: string;
    children: React.ReactNode;
}

const PendingApprovalButton: React.FC<PendingApprovalButtonProps> = ({ href, children }) => {
    return (
        <Button asChild className={styles.button}>
            <Link href={href}>{children}</Link>
        </Button>
    );
};

export default PendingApprovalButton;
