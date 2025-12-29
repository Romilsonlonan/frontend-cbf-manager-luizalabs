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
import { Handshake } from 'lucide-react';
import commonStyles from './athletes-filters-common.module.css';
import { AthletesFiltersAssistsInput } from './athletes-filters-assists-input';

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
    const [isOpen, setIsOpen] = useState(false);
    const [localAssistsFilter, setLocalAssistsFilter] = useState(assistsFilter);

    useEffect(() => {
        if (!isOpen) {
            setLocalAssistsFilter(assistsFilter);
        }
    }, [isOpen, assistsFilter]);

    const handleApplyFilter = () => {
        setAssistsFilter(localAssistsFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalAssistsFilter([0, Infinity]);
        setAssistsFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className={commonStyles.triggerButton}
                >
                    <Handshake className={commonStyles.icon} />
                    A {assistsFilter?.[0] === 0 && assistsFilter?.[1] === Infinity
                        ? ''
                        : `${assistsFilter?.[0] === 0 ? 'Min' : localAssistsFilter?.[0] ?? ''} ${assistsFilter?.[1] === Infinity ? 'Max' : localAssistsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Assistências</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <AthletesFiltersAssistsInput
                        assistsFilter={localAssistsFilter}
                        setAssistsFilter={setLocalAssistsFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Assistências
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
