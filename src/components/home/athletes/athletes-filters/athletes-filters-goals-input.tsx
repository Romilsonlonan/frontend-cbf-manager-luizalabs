'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-goals-input.module.css';

type AthletesFiltersGoalsInputProps = {
    goalsFilter: [number, number];
    setGoalsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersGoalsInput({
    goalsFilter,
    setGoalsFilter,
    handleRangeChange,
}: AthletesFiltersGoalsInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={goalsFilter?.[0] === 0 ? '' : String(goalsFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setGoalsFilter, 0, e, goalsFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={goalsFilter?.[1] === Infinity ? '' : String(goalsFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setGoalsFilter, 1, e, goalsFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
}
