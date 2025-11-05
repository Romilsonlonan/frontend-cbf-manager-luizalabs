'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-fouls-input.module.css';

type AthletesFiltersFoulsInputProps = {
    foulsFilter: [number, number];
    setFoulsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersFoulsInput({
    foulsFilter,
    setFoulsFilter,
    handleRangeChange,
}: AthletesFiltersFoulsInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={foulsFilter?.[0] === 0 ? '' : String(foulsFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setFoulsFilter, 0, e, foulsFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={foulsFilter?.[1] === Infinity ? '' : String(foulsFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setFoulsFilter, 1, e, foulsFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
}
