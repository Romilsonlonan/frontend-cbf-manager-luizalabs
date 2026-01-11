import React from 'react';
import styles from './IsLoading.module.css';

interface IsLoadingProps {
  message?: string;
}

export const IsLoading: React.FC<IsLoadingProps> = ({ message = 'Carregando jogadores...' }) => {
  return (
    <div className={styles.loadingContainer}>
      <p className={styles.loadingText}>{message}</p>
    </div>
  );
};
