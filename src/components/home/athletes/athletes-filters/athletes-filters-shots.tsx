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
import { Input } from '@/components/ui/input';
import { Crosshair } from 'lucide-react';
import React from 'react';
import styles from './athletes-filters-shots.module.css';

type AthletesFiltersShotsProps = {
    shotsFilter: [number, number];
    setShotsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersShots({
    shotsFilter,
    setShotsFilter,
    handleRangeChange,
}: AthletesFiltersShotsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={styles.triggerButton}>
                    <Crosshair className={styles.icon} />
                    TC {shotsFilter?.[0] === 0 && shotsFilter?.[1] === Infinity
                        ? 'Todas'
                        : `${shotsFilter?.[0] === 0 ? 'Min' : shotsFilter?.[0] ?? ''} ${shotsFilter?.[1] === Infinity ? 'Max' : shotsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Tentativas de Cruzamento</DialogTitle>
                </DialogHeader>
                <div className={styles.filterGrid}>
                    <div className={styles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={shotsFilter?.[0] === 0 ? '' : String(shotsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setShotsFilter, 0, e, shotsFilter)}
                            className={styles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={shotsFilter?.[1] === Infinity ? '' : String(shotsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setShotsFilter, 1, e, shotsFilter)}
                            className={styles.inputHalf}
                        />
                    </div>
                    <Button
                        variant={(shotsFilter?.[0] === 0 && shotsFilter?.[1] === Infinity) ? 'default' : 'outline'}
                        onClick={() => setShotsFilter([0, Infinity])}
                        className={styles.fullWidthButton}
                    >
                        Todas as Tentativas de Cruzamento
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
