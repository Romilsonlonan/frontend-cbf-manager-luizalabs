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
import { CreditCard } from "lucide-react";

interface AthletesFiltersYellowCardsDialogProps {
    yellowCardsFilter: [number, number];
    setYellowCardsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersYellowCardsDialog({
    yellowCardsFilter,
    setYellowCardsFilter,
    handleRangeChange,
}: AthletesFiltersYellowCardsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="px-3 flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    CA {yellowCardsFilter?.[0] === 0 && yellowCardsFilter?.[1] === Infinity
                        ? ''
                        : `${yellowCardsFilter?.[0] === 0 ? 'Min' : yellowCardsFilter?.[0] ?? ''}  ${yellowCardsFilter?.[1] === Infinity ? 'Max' : yellowCardsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cartões Amarelos</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                    <div className="flex gap-2 items-center">
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
                        Cartões Amarelos
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
