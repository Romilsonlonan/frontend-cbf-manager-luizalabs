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
import styles from './athletes-filters-assists.module.css';
import { AthletesFiltersAssistsInput } from './athletes-filters-assists-input';
import { AthletesFiltersAssistsButton } from './athletes-filters-assists-button';

type AthletesFiltersAssistsProps = {
    assistsFilter: [number, number];
    setAssistsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersAssists({
    assistsFilter,
    setAssistsFilter,
    handleRangeChange,
}: AthletesFiltersAssistsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <AthletesFiltersAssistsButton
                    assistsFilter={assistsFilter}
                    setAssistsFilter={setAssistsFilter}
                />
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Assistências</DialogTitle>
                </DialogHeader>
                <div className={styles.filterGrid}>
                    <AthletesFiltersAssistsInput
                        assistsFilter={assistsFilter}
                        setAssistsFilter={setAssistsFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant="ghost"
                        onClick={() => setAssistsFilter([0, Infinity])}
                        className={styles.fullWidthButton}
                    >
                        Todas as Assistências
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
