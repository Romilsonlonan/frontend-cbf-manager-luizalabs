'use client';

import { Button } from '@/components/ui/button';
import { Hand } from 'lucide-react';
import React from 'react';
import styles from './athletes-filters-fouls-committed-button.module.css';

type AthletesFiltersFoulsCommittedButtonProps = {
    foulsCommittedFilter: [number, number];
    setFoulsCommittedFilter: (value: [number, number]) => void;
};

export function AthletesFiltersFoulsCommittedButton({
    foulsCommittedFilter,
    setFoulsCommittedFilter,
}: AthletesFiltersFoulsCommittedButtonProps) {
    return (
        <Button
            variant="outline"
            className={styles.triggerButton}
        >
            <Hand className={styles.icon} />
            FC {foulsCommittedFilter?.[0] === 0 && foulsCommittedFilter?.[1] === Infinity
                ? ''
                : `${foulsCommittedFilter?.[0] === 0 ? 'Min' : foulsCommittedFilter?.[0] ?? ''}  ${foulsCommittedFilter?.[1] === Infinity ? 'Max' : foulsCommittedFilter?.[1] ?? ''}`}
        </Button>
    );
}
