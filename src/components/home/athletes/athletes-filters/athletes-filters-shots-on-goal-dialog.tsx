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
import commonStyles from './athletes-filters-common.module.css';

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
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Target className={commonStyles.icon} />
                    CG {shotsOnGoalFilter?.[0] === 0 && shotsOnGoalFilter?.[1] === Infinity
                        ? ''
                        : `${shotsOnGoalFilter?.[0] === 0 ? 'Min' : shotsOnGoalFilter?.[0] ?? ''} ${shotsOnGoalFilter?.[1] === Infinity ? 'Max' : shotsOnGoalFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Chutes a Gol</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <div className={commonStyles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={shotsOnGoalFilter?.[0] === 0 ? '' : String(shotsOnGoalFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setShotsOnGoalFilter, 0, e, shotsOnGoalFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={shotsOnGoalFilter?.[1] === Infinity ? '' : String(shotsOnGoalFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setShotsOnGoalFilter, 1, e, shotsOnGoalFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setShotsOnGoalFilter([0, Infinity])}
                        className={commonStyles.fullWidthButton}
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
