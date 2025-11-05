import React, { useState } from 'react';
import styles from './ChangePasswordSection.module.css';

interface ChangePasswordSectionProps {
    onChangePassword: (oldPass: string, newPass: string) => void;
}

const ChangePasswordSection: React.FC<ChangePasswordSectionProps> = ({ onChangePassword }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert('As novas senhas não coincidem!');
            return;
        }
        onChangePassword(oldPassword, newPassword);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Alterar Senha</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="old-password" className={styles.label}>Senha Antiga:</label>
                    <input
                        type="password"
                        id="old-password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="new-password" className={styles.label}>Nova Senha:</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirm-new-password" className={styles.label}>Confirmar Nova Senha:</label>
                    <input
                        type="password"
                        id="confirm-new-password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.saveButton}>Alterar Senha</button>
            </form>
        </div>
    );
};

export default ChangePasswordSection;
