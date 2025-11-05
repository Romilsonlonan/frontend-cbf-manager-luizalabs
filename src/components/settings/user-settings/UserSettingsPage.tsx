import React from 'react';
import styles from './UserSettingsPage.module.css';

interface UserSettingsPageProps {
    children: React.ReactNode;
}

const UserSettingsPage: React.FC<UserSettingsPageProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default UserSettingsPage;
