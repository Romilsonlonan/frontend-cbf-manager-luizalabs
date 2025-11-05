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
import { CreditCard } from 'lucide-react';
import React from 'react';
import styles from './athletes-filters-red-cards.module.css';

type AthletesFiltersRedCardsProps = {
    redCardsFilter: [number, number];
    setRedCardsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersRedCards({
    redCardsFilter,
    setRedCardsFilter,
    handleRangeChange,
}: AthletesFiltersRedCardsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={styles.triggerButton}>
                    <CreditCard className={styles.icon} />
                    CV {redCardsFilter?.[0] === 0 && redCardsFilter?.[1] === Infinity
                        ? ''
                        : `${redCardsFilter?.[0] === 0 ? 'Min' : redCardsFilter?.[0] ?? ''}  ${redCardsFilter?.[1] === Infinity ? 'Max' : redCardsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Cartões Vermelhos</DialogTitle>
                </DialogHeader>
                <div className={styles.filterGrid}>
                    <div className={styles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={redCardsFilter?.[0] === 0 ? '' : String(redCardsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setRedCardsFilter, 0, e, redCardsFilter)}
                            className={styles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={redCardsFilter?.[1] === Infinity ? '' : String(redCardsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setRedCardsFilter, 1, e, redCardsFilter)}
                            className={styles.inputHalf}
                        />
                    </div>
                    <Button
                        variant={(redCardsFilter?.[0] === 0 && redCardsFilter?.[1] === Infinity) ? 'default' : 'outline'}
                        onClick={() => setRedCardsFilter([0, Infinity])}
                        className={styles.fullWidthButton}
                    >
                        Todos os Cartões
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
