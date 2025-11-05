import React from 'react';
import styles from './athletes-filters-red-cards-button.module.css';

interface AthletesFiltersRedCardsButtonProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

const AthletesFiltersRedCardsButton: React.FC<AthletesFiltersRedCardsButtonProps> = ({ label, onClick, isActive }) => {
    return (
        <button
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default AthletesFiltersRedCardsButton;
