'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-age-input.module.css';

type AthletesFiltersAgeInputProps = {
    ageFilter: [number, number];
    setAgeFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersAgeInput({
    ageFilter,
    setAgeFilter,
    handleRangeChange,
}: AthletesFiltersAgeInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={ageFilter?.[0] === 0 ? '' : String(ageFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setAgeFilter, 0, e, ageFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={ageFilter?.[1] === Infinity ? '' : String(ageFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setAgeFilter, 1, e, ageFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
}
