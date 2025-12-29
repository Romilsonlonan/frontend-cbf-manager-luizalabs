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
import { Ruler } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { AthletesFiltersHeightInput } from './athletes-filters-height-input';
import commonStyles from './athletes-filters-common.module.css';

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
    const [isOpen, setIsOpen] = useState(false);
    const [localHeightFilter, setLocalHeightFilter] = useState(heightFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalHeightFilter(heightFilter);
        }
    }, [isOpen, heightFilter]);

    const handleApplyFilter = () => {
        setHeightFilter(localHeightFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalHeightFilter([0, Infinity]);
        setHeightFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost-transparent" className={commonStyles.triggerButton}>
                    <Ruler className={commonStyles.icon} />
                    Alt {heightFilter?.[0] === 0 && heightFilter?.[1] === Infinity
                        ? ''
                        : `${heightFilter?.[0] === 0 ? 'Min' : localHeightFilter?.[0] ?? ''}  ${heightFilter?.[1] === Infinity ? 'Max' : localHeightFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Altura</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <AthletesFiltersHeightInput
                        heightFilter={localHeightFilter}
                        setHeightFilter={setLocalHeightFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Alturas
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
