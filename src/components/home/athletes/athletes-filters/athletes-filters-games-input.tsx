import React from 'react';
import { Input } from '@/components/ui/input';
import styles from './athletes-filters-games-input.module.css';

interface AthletesFiltersGamesInputProps {
    gamesFilter: [number, number];
    setGamesFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export const AthletesFiltersGamesInput: React.FC<AthletesFiltersGamesInputProps> = ({
    gamesFilter,
    setGamesFilter,
    handleRangeChange,
}) => {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={gamesFilter?.[0] === 0 ? '' : String(gamesFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setGamesFilter, 0, e, gamesFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={gamesFilter?.[1] === Infinity ? '' : String(gamesFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setGamesFilter, 1, e, gamesFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
};
