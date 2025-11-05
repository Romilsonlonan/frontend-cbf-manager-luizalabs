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
import { Shield } from 'lucide-react';
import React from 'react';
import styles from './athletes-filters-fouls-suffered.module.css';
import { AthletesFiltersFoulsInput } from './athletes-filters-fouls-input';

type AthletesFiltersFoulsSufferedProps = {
    foulsSufferedFilter: [number, number];
    setFoulsSufferedFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersFoulsSuffered({
    foulsSufferedFilter,
    setFoulsSufferedFilter,
    handleRangeChange,
}: AthletesFiltersFoulsSufferedProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={styles.triggerButton}>
                    <Shield className={styles.icon} />
                    FS {foulsSufferedFilter?.[0] === 0 && foulsSufferedFilter?.[1] === Infinity
                        ? 'Todas'
                        : `${foulsSufferedFilter?.[0] === 0 ? 'Min' : foulsSufferedFilter?.[0] ?? ''}  ${foulsSufferedFilter?.[1] === Infinity ? 'Max' : foulsSufferedFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Faltas Sofridas</DialogTitle>
                </DialogHeader>
                <div className={styles.filterGrid}>
                    <AthletesFiltersFoulsInput
                        foulsFilter={foulsSufferedFilter}
                        setFoulsFilter={setFoulsSufferedFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant={(foulsSufferedFilter?.[0] === 0 && foulsSufferedFilter?.[1] === Infinity) ? 'default' : 'outline'}
                        onClick={() => setFoulsSufferedFilter([0, Infinity])}
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
