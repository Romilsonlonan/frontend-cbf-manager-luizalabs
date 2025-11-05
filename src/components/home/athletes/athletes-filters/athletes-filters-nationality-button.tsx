import React from 'react';
import styles from './athletes-filters-nationality.button.module.css';

interface AthletesFiltersNationalityButtonProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

const AthletesFiltersNationalityButton: React.FC<AthletesFiltersNationalityButtonProps> = ({ label, onClick, isActive }) => {
    return (
        <button
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default AthletesFiltersNationalityButton;
