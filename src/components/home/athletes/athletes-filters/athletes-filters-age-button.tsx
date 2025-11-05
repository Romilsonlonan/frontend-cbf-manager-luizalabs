'use client';

import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import React from 'react';
import styles from './athletes-filters-age-button.module.css';

type AthletesFiltersAgeButtonProps = {
    ageFilter: [number, number];
    setAgeFilter: (value: [number, number]) => void;
};

export function AthletesFiltersAgeButton({
    ageFilter,
    setAgeFilter,
}: AthletesFiltersAgeButtonProps) {
    return (
        <Button
            variant="ghost"
            className={styles.triggerButton}
        >
            <CalendarDays className={styles.icon} />
            Idade {ageFilter?.[0] === 0 && ageFilter?.[1] === Infinity
                ? ''
                : `${ageFilter?.[0] === 0 ? 'Min' : ageFilter?.[0] ?? ''}  ${ageFilter?.[1] === Infinity ? 'Max' : ageFilter?.[1] ?? ''}`}
        </Button>
    );
}
