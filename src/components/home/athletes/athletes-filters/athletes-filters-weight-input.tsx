'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-weight-input.module.css';

type AthletesFiltersWeightInputProps = {
    weightFilter: [number, number];
    setWeightFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersWeightInput({
    weightFilter,
    setWeightFilter,
    handleRangeChange,
}: AthletesFiltersWeightInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={weightFilter?.[0] === 0 ? '' : String(weightFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setWeightFilter, 0, e, weightFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={weightFilter?.[1] === Infinity ? '' : String(weightFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setWeightFilter, 1, e, weightFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
}
