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
import commonStyles from './athletes-filters-common.module.css';

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
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Crosshair className={commonStyles.icon} />
                    TC {shotsFilter?.[0] === 0 && shotsFilter?.[1] === Infinity
                        ? ''
                        : `${shotsFilter?.[0] === 0 ? 'Min' : shotsFilter?.[0] ?? ''} ${shotsFilter?.[1] === Infinity ? 'Max' : shotsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Tentativas de Cruzamento</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <div className={commonStyles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={shotsFilter?.[0] === 0 ? '' : String(shotsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setShotsFilter, 0, e, shotsFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={shotsFilter?.[1] === Infinity ? '' : String(shotsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setShotsFilter, 1, e, shotsFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setShotsFilter([0, Infinity])}
                        className={commonStyles.fullWidthButton}
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
