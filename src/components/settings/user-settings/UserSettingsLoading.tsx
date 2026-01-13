"use client";

import React from 'react';
import { USER_SETTINGS_STRINGS } from '@/constants/settings.constants';
import styles from './UserSettingsLoading.module.css';

export const UserSettingsLoading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <p>{USER_SETTINGS_STRINGS.LOADING_USER}</p>
    </div>
  );
};
