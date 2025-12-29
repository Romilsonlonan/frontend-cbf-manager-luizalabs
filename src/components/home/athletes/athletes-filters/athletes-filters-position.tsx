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
import { Users } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Position } from '@/lib/types';
import commonStyles from './athletes-filters-common.module.css';
import { AthletesFiltersPositionInput } from './athletes-filters-position-input';

type AthletesFiltersPositionProps = {
    positionFilter: (Position | 'all')[];
    setPositionFilter: (value: (Position | 'all')[]) => void;
};

const positionMap: Record<Position, string> = {
    A: 'Ataque',
    D: 'Defesa',
    M: 'Meio',
    G: 'Goleiro',
};

const mainPositions: Position[] = ['A', 'D', 'M', 'G'];
const specificPositions: Position[] = []; // Assuming specific positions will be added here if needed

export function AthletesFiltersPosition({
    positionFilter,
    setPositionFilter,
}: AthletesFiltersPositionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localPositionFilter, setLocalPositionFilter] = useState(positionFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalPositionFilter(positionFilter);
        }
    }, [isOpen, positionFilter]);

    const handleApplyFilter = () => {
        setPositionFilter(localPositionFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalPositionFilter(['all']);
        setPositionFilter(['all']);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Users className={commonStyles.icon} />
                    Posição
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Posição</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <AthletesFiltersPositionInput
                        positionFilter={localPositionFilter}
                        setPositionFilter={setLocalPositionFilter}
                    />
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Posições
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
