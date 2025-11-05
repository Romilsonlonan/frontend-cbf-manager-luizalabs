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
import { AthletesFiltersShotsOnGoalInput } from './athletes-filters-shots-on-goal-input';
import { AthletesFiltersShotsOnGoalButton } from './athletes-filters-shots-on-goal-button';

type AthletesFiltersShotsOnGoalProps = {
    shotsOnGoalFilter: [number, number];
    setShotsOnGoalFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
};

export function AthletesFiltersShotsOnGoal({
    shotsOnGoalFilter,
    setShotsOnGoalFilter,
    handleRangeChange,
}: AthletesFiltersShotsOnGoalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <AthletesFiltersShotsOnGoalButton shotsOnGoalFilter={shotsOnGoalFilter} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Chutes a Gol</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <AthletesFiltersShotsOnGoalInput
                        shotsOnGoalFilter={shotsOnGoalFilter}
                        setShotsOnGoalFilter={setShotsOnGoalFilter}
                        handleRangeChange={handleRangeChange}
                    />
                    <Button
                        variant={(shotsOnGoalFilter?.[0] === 0 && shotsOnGoalFilter?.[1] === Infinity) ? 'default' : 'outline'}
                        onClick={() => setShotsOnGoalFilter([0, Infinity])}
                        className="w-full"
                    >
                        Todos os Chutes a Gol
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
