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
import { Shirt } from "lucide-react";

interface AthletesFiltersGamesDialogProps {
    gamesFilter: [number, number];
    setGamesFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersGamesDialog({
    gamesFilter,
    setGamesFilter,
    handleRangeChange,
}: AthletesFiltersGamesDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="px-3 flex items-center gap-1">
                    <Shirt className="h-4 w-4" />
                    J{gamesFilter?.[0] === 0 && gamesFilter?.[1] === Infinity
                        ? ''
                        : `${gamesFilter?.[0] === 0 ? 'Min' : gamesFilter?.[0] ?? ''} ${gamesFilter?.[1] === Infinity ? 'Max' : gamesFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Jogos</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                    <div className="flex gap-2 items-center">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={gamesFilter?.[0] === 0 ? '' : String(gamesFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setGamesFilter, 0, e, gamesFilter)}
                            className="w-1/2"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={gamesFilter?.[1] === Infinity ? '' : String(gamesFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setGamesFilter, 1, e, gamesFilter)}
                            className="w-1/2"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setGamesFilter([0, Infinity])}
                        className="w-full"
                    >
                        Jogos
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
