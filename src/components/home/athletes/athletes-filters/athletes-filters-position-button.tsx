import React from 'react';
import styles from './athletes-filters-position-button.module.css';

interface AthletesFiltersPositionButtonProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

const AthletesFiltersPositionButton: React.FC<AthletesFiltersPositionButtonProps> = ({ label, onClick, isActive }) => {
    return (
        <button
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default AthletesFiltersPositionButton;
