'use client';

import { Button } from '@/components/ui/button';
import { Handshake } from 'lucide-react';
import React from 'react';
import styles from './athletes-filters-assists-button.module.css';

type AthletesFiltersAssistsButtonProps = {
    assistsFilter: [number, number];
    setAssistsFilter: (value: [number, number]) => void;
};

export function AthletesFiltersAssistsButton({
    assistsFilter,
    setAssistsFilter,
}: AthletesFiltersAssistsButtonProps) {
    return (
        <Button
            variant="ghost"
            className={styles.triggerButton}
        >
            <Handshake className={styles.icon} />
            A {assistsFilter?.[0] === 0 && assistsFilter?.[1] === Infinity
                ? ''
                : `${assistsFilter?.[0] === 0 ? 'Min' : assistsFilter?.[0] ?? ''} ${assistsFilter?.[1] === Infinity ? 'Max' : assistsFilter?.[1] ?? ''}`}
        </Button>
    );
}
