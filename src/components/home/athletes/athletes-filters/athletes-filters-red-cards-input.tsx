'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-red-cards-input.module.css';

type AthletesFiltersRedCardsInputProps = {
    redCardsFilter: [number, number];
    setRedCardsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersRedCardsInput({
    redCardsFilter,
    setRedCardsFilter,
    handleRangeChange,
}: AthletesFiltersRedCardsInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={redCardsFilter?.[0] === 0 ? '' : String(redCardsFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setRedCardsFilter, 0, e, redCardsFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={redCardsFilter?.[1] === Infinity ? '' : String(redCardsFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setRedCardsFilter, 1, e, redCardsFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
}
