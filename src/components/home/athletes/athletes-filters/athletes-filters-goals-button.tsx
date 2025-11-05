import React from 'react';
import styles from './athletes-filters-goals.button.module.css';

interface AthletesFiltersGoalsButtonProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

const AthletesFiltersGoalsButton: React.FC<AthletesFiltersGoalsButtonProps> = ({ label, onClick, isActive }) => {
    return (
        <button
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default AthletesFiltersGoalsButton;
