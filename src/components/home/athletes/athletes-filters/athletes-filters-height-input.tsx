'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-height-input.module.css';

type AthletesFiltersHeightInputProps = {
    heightFilter: [number, number];
    setHeightFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersHeightInput({
    heightFilter,
    setHeightFilter,
    handleRangeChange,
}: AthletesFiltersHeightInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={heightFilter?.[0] === 0 ? '' : String(heightFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setHeightFilter, 0, e, heightFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={heightFilter?.[1] === Infinity ? '' : String(heightFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setHeightFilter, 1, e, heightFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
}
