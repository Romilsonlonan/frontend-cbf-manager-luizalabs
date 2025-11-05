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
import { Goal } from "lucide-react";

interface AthletesFiltersGoalsDialogProps {
    goalsFilter: [number, number];
    setGoalsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersGoalsDialog({
    goalsFilter,
    setGoalsFilter,
    handleRangeChange,
}: AthletesFiltersGoalsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="px-3 flex items-center gap-1">
                    <Goal className="h-4 w-4" />
                    G{goalsFilter?.[0] === 0 && goalsFilter?.[1] === Infinity
                        ? ''
                        : `${goalsFilter?.[0] === 0 ? 'Min' : goalsFilter?.[0] ?? ''} ${goalsFilter?.[1] === Infinity ? 'Max' : goalsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Gols</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                    <div className="flex gap-2 items-center">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={goalsFilter?.[0] === 0 ? '' : String(goalsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setGoalsFilter, 0, e, goalsFilter)}
                            className="w-1/2"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={goalsFilter?.[1] === Infinity ? '' : String(goalsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setGoalsFilter, 1, e, goalsFilter)}
                            className="w-1/2"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setGoalsFilter([0, Infinity])}
                        className="w-full"
                    >
                        Gols
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
