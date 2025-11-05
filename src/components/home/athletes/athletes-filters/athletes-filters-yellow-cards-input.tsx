'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-yellow-cards-input.module.css';

type AthletesFiltersYellowCardsInputProps = {
    yellowCardsFilter: [number, number];
    setYellowCardsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersYellowCardsInput({
    yellowCardsFilter,
    setYellowCardsFilter,
    handleRangeChange,
}: AthletesFiltersYellowCardsInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={yellowCardsFilter?.[0] === 0 ? '' : String(yellowCardsFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setYellowCardsFilter, 0, e, yellowCardsFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={yellowCardsFilter?.[1] === Infinity ? '' : String(yellowCardsFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setYellowCardsFilter, 1, e, yellowCardsFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
}
