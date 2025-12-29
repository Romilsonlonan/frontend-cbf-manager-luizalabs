import React, { useState } from 'react';
import styles from './ThemeCustomizationSection.module.css';

interface ThemeCustomizationSectionProps {
    currentTheme: string;
    onThemeChange: (newTheme: string) => void;
    currentNavbarColor: string;
    onNavbarColorChange: (newColor: string) => void;
    currentSidebarColor: string;
    onSidebarColorChange: (newColor: string) => void;
}

const ThemeCustomizationSection: React.FC<ThemeCustomizationSectionProps> = ({
    currentTheme,
    onThemeChange,
    currentNavbarColor,
    onNavbarColorChange,
    currentSidebarColor,
    onSidebarColorChange,
}) => {
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);
    const [selectedNavbarColor, setSelectedNavbarColor] = useState(currentNavbarColor);
    const [selectedSidebarColor, setSelectedSidebarColor] = useState(currentSidebarColor);

    const colorOptions = [
        { value: 'default', label: 'Padrão' },
        { value: 'black', label: 'Preto' },
        { value: 'dark-blue', label: 'Azul Escuro' },
        { value: 'gray', label: 'Cinza' },
        { value: 'lilac', label: 'Lilás' },
        { value: 'purple', label: 'Roxo' },
        { value: 'blue', label: 'Azul' },
    ];

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value;
        setSelectedTheme(newTheme);
        onThemeChange(newTheme);
    };

    const handleNavbarColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newColor = e.target.value;
        setSelectedNavbarColor(newColor);
        onNavbarColorChange(newColor);
    };

    const handleSidebarColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newColor = e.target.value;
        setSelectedSidebarColor(newColor);
        onSidebarColorChange(newColor);
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
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="navbar-color-select" className={styles.label}>Cor da Barra de Navegação:</label>
                <select
                    id="navbar-color-select"
                    value={selectedNavbarColor}
                    onChange={handleNavbarColorChange}
                    className={styles.select}
                >
                    {colorOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="sidebar-color-select" className={styles.label}>Cor da Barra Lateral:</label>
                <select
                    id="sidebar-color-select"
                    value={selectedSidebarColor}
                    onChange={handleSidebarColorChange}
                    className={styles.select}
                >
                    {colorOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ThemeCustomizationSection;
