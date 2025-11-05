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
import { SquareSlash } from "lucide-react";

interface AthletesFiltersRedCardsDialogProps {
    redCardsFilter: [number, number];
    setRedCardsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersRedCardsDialog({
    redCardsFilter,
    setRedCardsFilter,
    handleRangeChange,
}: AthletesFiltersRedCardsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="px-3 flex items-center gap-1">
                    <SquareSlash className="h-4 w-4" />
                    CV {redCardsFilter?.[0] === 0 && redCardsFilter?.[1] === Infinity
                        ? ''
                        : `${redCardsFilter?.[0] === 0 ? 'Min' : redCardsFilter?.[0] ?? ''} ${redCardsFilter?.[1] === Infinity ? 'Max' : redCardsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cartões Vermelhos</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                    <div className="flex gap-2 items-center">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={redCardsFilter?.[0] === 0 ? '' : String(redCardsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setRedCardsFilter, 0, e, redCardsFilter)}
                            className="w-1/2"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={redCardsFilter?.[1] === Infinity ? '' : String(redCardsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setRedCardsFilter, 1, e, redCardsFilter)}
                            className="w-1/2"
                        />
                    </div>
                    <Button
                        variant={(redCardsFilter?.[0] === 0 && redCardsFilter?.[1] === Infinity) ? 'default' : 'outline'}
                        onClick={() => setRedCardsFilter([0, Infinity])}
                        className="w-full"
                    >
                        Cartões Vermelhos
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
