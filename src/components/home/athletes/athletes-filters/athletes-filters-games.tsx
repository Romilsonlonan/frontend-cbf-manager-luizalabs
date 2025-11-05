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
import React from 'react';
import { AthletesFiltersGamesButton } from './athletes-filters-games-button';
import { AthletesFiltersGamesInput } from './athletes-filters-games-input';

type AthletesFiltersGamesProps = {
    gamesFilter: [number, number];
    setGamesFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersGames({
    gamesFilter,
    setGamesFilter,
    handleRangeChange,
}: AthletesFiltersGamesProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <AthletesFiltersGamesButton gamesFilter={gamesFilter} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Jogos</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <AthletesFiltersGamesInput
                        gamesFilter={gamesFilter}
                        setGamesFilter={setGamesFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant={(gamesFilter?.[0] === 0 && gamesFilter?.[1] === Infinity) ? 'default' : 'outline'}
                        onClick={() => setGamesFilter([0, Infinity])}
                        className="w-full"
                    >
                        Todos os Jogos
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
