'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-assists-input.module.css';

type AthletesFiltersAssistsInputProps = {
    assistsFilter: [number, number];
    setAssistsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersAssistsInput({
    assistsFilter,
    setAssistsFilter,
    handleRangeChange,
}: AthletesFiltersAssistsInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={assistsFilter?.[0] === 0 ? '' : String(assistsFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setAssistsFilter, 0, e, assistsFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={assistsFilter?.[1] === Infinity ? '' : String(assistsFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setAssistsFilter, 1, e, assistsFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
}
