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
import { Scale } from "lucide-react";

interface AthletesFiltersFoulsSufferedDialogProps {
    foulsSufferedFilter: [number, number];
    setFoulsSufferedFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersFoulsSufferedDialog({
    foulsSufferedFilter,
    setFoulsSufferedFilter,
    handleRangeChange,
}: AthletesFiltersFoulsSufferedDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="px-3 flex items-center gap-1">
                    <Scale className="h-4 w-4" />
                    FS {foulsSufferedFilter?.[0] === 0 && foulsSufferedFilter?.[1] === Infinity
                        ? ''
                        : `${foulsSufferedFilter?.[0] === 0 ? 'Min' : foulsSufferedFilter?.[0] ?? ''}  ${foulsSufferedFilter?.[1] === Infinity ? 'Max' : foulsSufferedFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Faltas Sofridas</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                    <div className="flex gap-2 items-center">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={foulsSufferedFilter?.[0] === 0 ? '' : String(foulsSufferedFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setFoulsSufferedFilter, 0, e, foulsSufferedFilter)}
                            className="w-1/2"
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={foulsSufferedFilter?.[1] === Infinity ? '' : String(foulsSufferedFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setFoulsSufferedFilter, 1, e, foulsSufferedFilter)}
                            className="w-1/2"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setFoulsSufferedFilter([0, Infinity])}
                        className="w-full"
                    >
                        Faltas Sofridas
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
