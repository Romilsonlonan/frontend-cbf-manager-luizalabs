'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';
import { AthletesFiltersWeightButton } from './athletes-filters-weight-button';

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
    return (
        <Dialog>
            <DialogTrigger asChild>
                <AthletesFiltersWeightButton weightFilter={weightFilter} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Peso</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={weightFilter?.[0] === 0 ? '' : String(weightFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setWeightFilter, 0, e, weightFilter)}
                            className="w-1/2"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={weightFilter?.[1] === Infinity ? '' : String(weightFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setWeightFilter, 1, e, weightFilter)}
                            className="w-1/2"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setWeightFilter([0, Infinity])}
                        className="w-full"
                    >
                        Todos os Pesos
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
