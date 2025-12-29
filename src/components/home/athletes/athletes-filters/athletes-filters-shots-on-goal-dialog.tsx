import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
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
    const [isOpen, setIsOpen] = useState(false);
    const [localShotsOnGoalFilter, setLocalShotsOnGoalFilter] = useState(shotsOnGoalFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalShotsOnGoalFilter(shotsOnGoalFilter);
        }
    }, [isOpen, shotsOnGoalFilter]);

    const handleApplyFilter = () => {
        setShotsOnGoalFilter(localShotsOnGoalFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalShotsOnGoalFilter([0, Infinity]);
        setShotsOnGoalFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Target className={commonStyles.icon} />
                    CG {shotsOnGoalFilter?.[0] === 0 && shotsOnGoalFilter?.[1] === Infinity
                        ? ''
                        : `${shotsOnGoalFilter?.[0] === 0 ? 'Min' : localShotsOnGoalFilter?.[0] ?? ''} ${shotsOnGoalFilter?.[1] === Infinity ? 'Max' : localShotsOnGoalFilter?.[1] ?? ''}`}
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
                            value={localShotsOnGoalFilter?.[0] === 0 ? '' : String(localShotsOnGoalFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setLocalShotsOnGoalFilter, 0, e, localShotsOnGoalFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={localShotsOnGoalFilter?.[1] === Infinity ? '' : String(localShotsOnGoalFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setLocalShotsOnGoalFilter, 1, e, localShotsOnGoalFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todos os Chutes a Gol
                    </Button>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                        Fechar
                    </Button>
                    <Button type="button" onClick={handleApplyFilter}>
                        Aplicar Filtro
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
