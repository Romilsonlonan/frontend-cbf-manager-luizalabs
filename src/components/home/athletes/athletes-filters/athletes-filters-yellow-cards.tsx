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
import { AthletesFiltersYellowButton } from './athletes-filters-yellow-button';

type AthletesFiltersYellowCardsProps = {
    yellowCardsFilter: [number, number];
    setYellowCardsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersYellowCards({
    yellowCardsFilter,
    setYellowCardsFilter,
    handleRangeChange,
}: AthletesFiltersYellowCardsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <AthletesFiltersYellowButton yellowCardsFilter={yellowCardsFilter} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Cartões Amarelos</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={yellowCardsFilter?.[0] === 0 ? '' : String(yellowCardsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setYellowCardsFilter, 0, e, yellowCardsFilter)}
                            className="w-1/2"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={yellowCardsFilter?.[1] === Infinity ? '' : String(yellowCardsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setYellowCardsFilter, 1, e, yellowCardsFilter)}
                            className="w-1/2"
                        />
                    </div>
                    <Button
                        variant={(yellowCardsFilter?.[0] === 0 && yellowCardsFilter?.[1] === Infinity) ? 'default' : 'outline'}
                        onClick={() => setYellowCardsFilter([0, Infinity])}
                        className="w-full"
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
