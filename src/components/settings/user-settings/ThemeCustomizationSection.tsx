import React, { useState } from 'react';
import styles from './ThemeCustomizationSection.module.css';

interface ThemeCustomizationSectionProps {
    currentTheme: string;
    onThemeChange: (newTheme: string) => void;
}

const ThemeCustomizationSection: React.FC<ThemeCustomizationSectionProps> = ({ currentTheme, onThemeChange }) => {
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value;
        setSelectedTheme(newTheme);
        onThemeChange(newTheme);
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Personalização de Tema</h2>
            <div className={styles.formGroup}>
                <label htmlFor="theme-select" className={styles.label}>Tema:</label>
                <select
                    id="theme-select"
                    value={selectedTheme}
                    onChange={handleThemeChange}
                    className={styles.select}
                >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    {/* Add more theme options as needed */}
                </select>
            </div>
        </div>
    );
};

export default ThemeCustomizationSection;
