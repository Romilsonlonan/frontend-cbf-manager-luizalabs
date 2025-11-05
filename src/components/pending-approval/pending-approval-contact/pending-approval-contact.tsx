import React from 'react';
import styles from './pending-approval-contact.module.css';

interface PendingApprovalContactProps {
    email: string;
    phone: string;
}

const PendingApprovalContact: React.FC<PendingApprovalContactProps> = ({ email, phone }) => {
    return (
        <div className={styles.contactContainer}>
            <h3 className={styles.contactTitle}>Contato</h3>
            <p className={styles.contactItem}>Email: <a href={`mailto:${email}`} className={styles.contactLink}>{email}</a></p>
            <p className={styles.contactItem}>Telefone: <a href={`tel:${phone}`} className={styles.contactLink}>{phone}</a></p>
        </div>
    );
};

export default PendingApprovalContact;
