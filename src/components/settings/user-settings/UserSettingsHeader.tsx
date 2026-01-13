"use client";

import React from 'react';
import { USER_SETTINGS_STRINGS } from '@/constants/settings.constants';
import styles from './UserSettingsHeader.module.css';

interface UserSettingsHeaderProps {
  message?: string;
  error?: string;
}

export const UserSettingsHeader: React.FC<UserSettingsHeaderProps> = ({ message, error }) => {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.title}>{USER_SETTINGS_STRINGS.PAGE_TITLE}</h1>
      {message && <div className={styles.successMessage}>{message}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
