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
import commonStyles from './athletes-filters-common.module.css';

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
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Scale className={commonStyles.icon} />
                    FS {foulsSufferedFilter?.[0] === 0 && foulsSufferedFilter?.[1] === Infinity
                        ? ''
                        : `${foulsSufferedFilter?.[0] === 0 ? 'Min' : foulsSufferedFilter?.[0] ?? ''}  ${foulsSufferedFilter?.[1] === Infinity ? 'Max' : foulsSufferedFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Faltas Sofridas</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <div className={commonStyles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={foulsSufferedFilter?.[0] === 0 ? '' : String(foulsSufferedFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setFoulsSufferedFilter, 0, e, foulsSufferedFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={foulsSufferedFilter?.[1] === Infinity ? '' : String(foulsSufferedFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setFoulsSufferedFilter, 1, e, foulsSufferedFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setFoulsSufferedFilter([0, Infinity])}
                        className={commonStyles.fullWidthButton}
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
