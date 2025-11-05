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
import commonStyles from './athletes-filters-common.module.css';
import { AthletesFiltersAgeInput } from './athletes-filters-age-input';
import { AthletesFiltersAgeButton } from './athletes-filters-age-button';

type AthletesFiltersAgeProps = {
    ageFilter: [number, number];
    setAgeFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersAge({
    ageFilter,
    setAgeFilter,
    handleRangeChange,
}: AthletesFiltersAgeProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <AthletesFiltersAgeButton
                    ageFilter={ageFilter}
                    setAgeFilter={setAgeFilter}
                />
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Idade</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <AthletesFiltersAgeInput
                        ageFilter={ageFilter}
                        setAgeFilter={setAgeFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant="ghost"
                        onClick={() => setAgeFilter([0, Infinity])}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Idades
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
