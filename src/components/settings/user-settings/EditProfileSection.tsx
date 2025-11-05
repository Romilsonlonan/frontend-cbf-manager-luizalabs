import React, { useState } from 'react';
import styles from './EditProfileSection.module.css';

interface EditProfileSectionProps {
    currentName: string;
    currentEmail: string;
    onSave: (name: string, email: string) => void;
}

const EditProfileSection: React.FC<EditProfileSectionProps> = ({ currentName, currentEmail, onSave }) => {
    const [name, setName] = useState(currentName);
    const [email, setEmail] = useState(currentEmail);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(name, email);
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Editar Perfil</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Nome:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.saveButton}>Salvar Alterações</button>
            </form>
        </div>
    );
};

export default EditProfileSection;
