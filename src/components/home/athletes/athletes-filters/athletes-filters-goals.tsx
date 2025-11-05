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
import { Goal } from 'lucide-react';
import React from 'react';
import { AthletesFiltersGoalsInput } from './athletes-filters-goals-input';
import styles from './athletes-filters-goals.module.css';

type AthletesFiltersGoalsProps = {
    goalsFilter: [number, number];
    setGoalsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersGoals({
    goalsFilter,
    setGoalsFilter,
    handleRangeChange,
}: AthletesFiltersGoalsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={styles.triggerButton}>
                    <Goal className={styles.icon} />
                    G{goalsFilter?.[0] === 0 && goalsFilter?.[1] === Infinity
                        ? ''
                        : `${goalsFilter?.[0] === 0 ? 'Min' : goalsFilter?.[0] ?? ''} ${goalsFilter?.[1] === Infinity ? 'Max' : goalsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Gols</DialogTitle>
                </DialogHeader>
                <div className={styles.filterGrid}>
                    <AthletesFiltersGoalsInput
                        goalsFilter={goalsFilter}
                        setGoalsFilter={setGoalsFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant={(goalsFilter?.[0] === 0 && goalsFilter?.[1] === Infinity) ? 'default' : 'outline'}
                        onClick={() => setGoalsFilter([0, Infinity])}
                        className={styles.fullWidthButton}
                    >
                        Todos os Gols
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
