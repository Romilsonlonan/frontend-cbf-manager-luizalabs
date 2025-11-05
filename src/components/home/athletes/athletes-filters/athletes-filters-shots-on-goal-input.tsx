'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-shots-on-goal-input.module.css';

type AthletesFiltersShotsOnGoalInputProps = {
    shotsOnGoalFilter: [number, number];
    setShotsOnGoalFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersShotsOnGoalInput({
    shotsOnGoalFilter,
    setShotsOnGoalFilter,
    handleRangeChange,
}: AthletesFiltersShotsOnGoalInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="number"
                placeholder="Min"
                value={shotsOnGoalFilter?.[0] === 0 ? '' : String(shotsOnGoalFilter?.[0] || '')}
                onChange={(e) => handleRangeChange(setShotsOnGoalFilter, 0, e, shotsOnGoalFilter)}
                className={styles.inputHalf}
            />
            <Input
                type="number"
                placeholder="Max"
                value={shotsOnGoalFilter?.[1] === Infinity ? '' : String(shotsOnGoalFilter?.[1] || '')}
                onChange={(e) => handleRangeChange(setShotsOnGoalFilter, 1, e, shotsOnGoalFilter)}
                className={styles.inputHalf}
            />
        </div>
    );
}
