import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";

interface AthletesFiltersShotsOnGoalDialogProps {
    shotsOnGoalFilter: [number, number];
    setShotsOnGoalFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersShotsOnGoalDialog({
    shotsOnGoalFilter,
    setShotsOnGoalFilter,
    handleRangeChange,
}: AthletesFiltersShotsOnGoalDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="px-3 flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    CG {shotsOnGoalFilter?.[0] === 0 && shotsOnGoalFilter?.[1] === Infinity
                        ? ''
                        : `${shotsOnGoalFilter?.[0] === 0 ? 'Min' : shotsOnGoalFilter?.[0] ?? ''} ${shotsOnGoalFilter?.[1] === Infinity ? 'Max' : shotsOnGoalFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Chutes a Gol</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                    <div className="flex gap-2 items-center">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={shotsOnGoalFilter?.[0] === 0 ? '' : String(shotsOnGoalFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setShotsOnGoalFilter, 0, e, shotsOnGoalFilter)}
                            className="w-1/2"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={shotsOnGoalFilter?.[1] === Infinity ? '' : String(shotsOnGoalFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setShotsOnGoalFilter, 1, e, shotsOnGoalFilter)}
                            className="w-1/2"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setShotsOnGoalFilter([0, Infinity])}
                        className="w-full"
                    >
                        Chutes a Gol
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
