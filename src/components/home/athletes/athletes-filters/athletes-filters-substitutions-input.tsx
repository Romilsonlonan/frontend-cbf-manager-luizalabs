'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-substitutions-input.module.css';

type AthletesFiltersSubstitutionsInputProps = {
    substitutionsFilter: [number, number];
    setSubstitutionsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersSubstitutionsInput({
    substitutionsFilter,
    setSubstitutionsFilter,
    handleRangeChange,
}: AthletesFiltersSubstitutionsInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={substitutionsFilter?.[0] === 0 ? '' : String(substitutionsFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setSubstitutionsFilter, 0, e, substitutionsFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={substitutionsFilter?.[1] === Infinity ? '' : String(substitutionsFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setSubstitutionsFilter, 1, e, substitutionsFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
}
