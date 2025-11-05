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
import { Crosshair } from "lucide-react";

interface AthletesFiltersShotsDialogProps {
    shotsFilter: [number, number];
    setShotsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersShotsDialog({
    shotsFilter,
    setShotsFilter,
    handleRangeChange,
}: AthletesFiltersShotsDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="px-3 flex items-center gap-1">
                    <Crosshair className="h-4 w-4" />
                    TC {shotsFilter?.[0] === 0 && shotsFilter?.[1] === Infinity
                        ? ''
                        : `${shotsFilter?.[0] === 0 ? 'Min' : shotsFilter?.[0] ?? ''} ${shotsFilter?.[1] === Infinity ? 'Max' : shotsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tentativas de Cruzamento</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                    <div className="flex gap-2 items-center">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={shotsFilter?.[0] === 0 ? '' : String(shotsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setShotsFilter, 0, e, shotsFilter)}
                            className="w-1/2"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={shotsFilter?.[1] === Infinity ? '' : String(shotsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setShotsFilter, 1, e, shotsFilter)}
                            className="w-1/2"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setShotsFilter([0, Infinity])}
                        className="w-full"
                    >
                        Tentativas de Cruzamento
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
