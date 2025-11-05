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
import { Users } from 'lucide-react';
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
    return (
        <Dialog>
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
                        positionFilter={positionFilter}
                        setPositionFilter={setPositionFilter}
                    />
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
