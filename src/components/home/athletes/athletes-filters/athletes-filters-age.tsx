'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from '@/components/ui/dialog';
import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import commonStyles from './athletes-filters-common.module.css';
import { AthletesFiltersAgeInput } from './athletes-filters-age-input';

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
    const [isOpen, setIsOpen] = useState(false);
    const [localAgeFilter, setLocalAgeFilter] = useState(ageFilter);

    useEffect(() => {
        if (!isOpen) {
            setLocalAgeFilter(ageFilter);
        }
    }, [isOpen, ageFilter]);

    const handleApplyFilter = () => {
        setAgeFilter(localAgeFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalAgeFilter([0, Infinity]);
        setAgeFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className={commonStyles.triggerButton}
                >
                    <CalendarDays className={commonStyles.icon} />
                    Idade {ageFilter?.[0] === 0 && ageFilter?.[1] === Infinity
                        ? ''
                        : `${ageFilter?.[0] === 0 ? 'Min' : localAgeFilter?.[0] ?? ''}  ${ageFilter?.[1] === Infinity ? 'Max' : localAgeFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Idade</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <AthletesFiltersAgeInput
                        ageFilter={localAgeFilter}
                        setAgeFilter={setLocalAgeFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Idades
                    </Button>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                        Fechar
                    </Button>
                    <Button type="button" onClick={handleApplyFilter}>
                        Aplicar Filtro
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
