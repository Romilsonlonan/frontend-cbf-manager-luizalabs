'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import { Weight } from 'lucide-react';
import commonStyles from './athletes-filters-common.module.css';

type AthletesFiltersWeightProps = {
    weightFilter: [number, number];
    setWeightFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersWeight({
    weightFilter,
    setWeightFilter,
    handleRangeChange,
}: AthletesFiltersWeightProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localWeightFilter, setLocalWeightFilter] = useState(weightFilter);

    useEffect(() => {
        if (!isOpen) {
            setLocalWeightFilter(weightFilter);
        }
    }, [isOpen, weightFilter]);

    const handleApplyFilter = () => {
        setWeightFilter(localWeightFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalWeightFilter([0, Infinity]);
        setWeightFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost-transparent" className={commonStyles.triggerButton}>
                    <Weight className={commonStyles.icon} />
                    P {weightFilter?.[0] === 0 && weightFilter?.[1] === Infinity
                        ? ''
                        : `${weightFilter?.[0] === 0 ? 'Min' : localWeightFilter?.[0] ?? ''} ${weightFilter?.[1] === Infinity ? 'Max' : localWeightFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Peso</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <div className={commonStyles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={localWeightFilter?.[0] === 0 ? '' : String(localWeightFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setLocalWeightFilter, 0, e, localWeightFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={localWeightFilter?.[1] === Infinity ? '' : String(localWeightFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setLocalWeightFilter, 1, e, localWeightFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todos os Pesos
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
