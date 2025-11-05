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
import commonStyles from './athletes-filters-common.module.css';

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
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Goal className={commonStyles.icon} />
                    G{goalsFilter?.[0] === 0 && goalsFilter?.[1] === Infinity
                        ? ''
                        : `${goalsFilter?.[0] === 0 ? 'Min' : goalsFilter?.[0] ?? ''} ${goalsFilter?.[1] === Infinity ? 'Max' : goalsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Gols</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <div className={commonStyles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={goalsFilter?.[0] === 0 ? '' : String(goalsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setGoalsFilter, 0, e, goalsFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={goalsFilter?.[1] === Infinity ? '' : String(goalsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setGoalsFilter, 1, e, goalsFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setGoalsFilter([0, Infinity])}
                        className={commonStyles.fullWidthButton}
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
