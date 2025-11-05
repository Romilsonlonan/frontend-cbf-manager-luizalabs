'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import React from 'react';
import styles from './athletes-filters-fouls-committed.module.css';
import { AthletesFiltersFoulsInput } from './athletes-filters-fouls-input';
import { AthletesFiltersFoulsCommittedButton } from './athletes-filters-fouls-committed-button';

type AthletesFiltersFoulsCommittedProps = {
    foulsCommittedFilter: [number, number];
    setFoulsCommittedFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersFoulsCommitted({
    foulsCommittedFilter,
    setFoulsCommittedFilter,
    handleRangeChange,
}: AthletesFiltersFoulsCommittedProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <AthletesFiltersFoulsCommittedButton
                    foulsCommittedFilter={foulsCommittedFilter}
                    setFoulsCommittedFilter={setFoulsCommittedFilter}
                />
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Faltas Cometidas</DialogTitle>
                </DialogHeader>
                <div className={styles.filterGrid}>
                    <AthletesFiltersFoulsInput
                        foulsFilter={foulsCommittedFilter}
                        setFoulsFilter={setFoulsCommittedFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant={(foulsCommittedFilter?.[0] === 0 && foulsCommittedFilter?.[1] === Infinity) ? 'default' : 'outline'}
                        onClick={() => setFoulsCommittedFilter([0, Infinity])}
                        className={styles.fullWidthButton}
                    >
                        Todas as Faltas
                    </Button>
                </div>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Fechar
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
