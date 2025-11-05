import React from 'react';
import styles from './athletes-filters-height.button.module.css';

interface AthletesFiltersHeightButtonProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

const AthletesFiltersHeightButton: React.FC<AthletesFiltersHeightButtonProps> = ({ label, onClick, isActive }) => {
    return (
        <button
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default AthletesFiltersHeightButton;
