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
import { AthletesFiltersSubstitutionsButton } from './athletes-filters-substitutions-button';

type AthletesFiltersSubstitutionsProps = {
    substituteAppearancesFilter: [number, number];
    setSubstituteAppearancesFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersSubstitutions({
    substituteAppearancesFilter,
    setSubstituteAppearancesFilter,
    handleRangeChange,
}: AthletesFiltersSubstitutionsProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <AthletesFiltersSubstitutionsButton substituteAppearancesFilter={substituteAppearancesFilter} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Substituições</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={substituteAppearancesFilter?.[0] === 0 ? '' : String(substituteAppearancesFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setSubstituteAppearancesFilter, 0, e, substituteAppearancesFilter)}
                            className="w-1/2"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={substituteAppearancesFilter?.[1] === Infinity ? '' : String(substituteAppearancesFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setSubstituteAppearancesFilter, 1, e, substituteAppearancesFilter)}
                            className="w-1/2"
                        />
                    </div>
                    <Button
                        variant={(substituteAppearancesFilter?.[0] === 0 && substituteAppearancesFilter?.[1] === Infinity) ? 'default' : 'outline'}
                        onClick={() => setSubstituteAppearancesFilter([0, Infinity])}
                        className="w-full"
                    >
                        Todas as Substituições
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
