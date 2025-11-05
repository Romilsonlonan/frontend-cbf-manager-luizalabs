import React from 'react';
import styles from './DeleteAccountSection.module.css';

interface DeleteAccountSectionProps {
    onDeleteAccount: () => void;
}

const DeleteAccountSection: React.FC<DeleteAccountSectionProps> = ({ onDeleteAccount }) => {
    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Excluir Conta</h2>
            <p className={styles.description}>
                Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
            </p>
            <button onClick={onDeleteAccount} className={styles.deleteButton}>
                Excluir Conta
            </button>
        </div>
    );
};

export default DeleteAccountSection;
