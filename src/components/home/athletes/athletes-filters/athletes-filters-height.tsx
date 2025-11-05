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
import { Ruler } from 'lucide-react';
import React from 'react';
import { AthletesFiltersHeightInput } from './athletes-filters-height-input';
import styles from './athletes-filters-height.module.css';

type AthletesFiltersHeightProps = {
    heightFilter: [number, number];
    setHeightFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersHeight({
    heightFilter,
    setHeightFilter,
    handleRangeChange,
}: AthletesFiltersHeightProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost-transparent" className={styles.triggerButton}>
                    <Ruler className={styles.icon} />
                    Alt {heightFilter?.[0] === 0 && heightFilter?.[1] === Infinity
                        ? ''
                        : `${heightFilter?.[0] === 0 ? 'Min' : heightFilter?.[0] ?? ''}  ${heightFilter?.[1] === Infinity ? 'Max' : heightFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Altura</DialogTitle>
                </DialogHeader>
                <div className={styles.filterGrid}>
                    <AthletesFiltersHeightInput
                        heightFilter={heightFilter}
                        setHeightFilter={setHeightFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant="ghost"
                        onClick={() => setHeightFilter([0, Infinity])}
                        className={styles.fullWidthButton}
                    >
                        Todas as Alturas
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
