import React from 'react';
import styles from './athletes-filters-name.button.module.css';

interface AthletesFiltersNameButtonProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

const AthletesFiltersNameButton: React.FC<AthletesFiltersNameButtonProps> = ({ label, onClick, isActive }) => {
    return (
        <button
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default AthletesFiltersNameButton;
