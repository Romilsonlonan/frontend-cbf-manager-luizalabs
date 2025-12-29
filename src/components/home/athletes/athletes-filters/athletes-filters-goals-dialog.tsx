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
    const [isOpen, setIsOpen] = useState(false);
    const [localGoalsFilter, setLocalGoalsFilter] = useState(goalsFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalGoalsFilter(goalsFilter);
        }
    }, [isOpen, goalsFilter]);

    const handleApplyFilter = () => {
        setGoalsFilter(localGoalsFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalGoalsFilter([0, Infinity]);
        setGoalsFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Goal className={commonStyles.icon} />
                    G{goalsFilter?.[0] === 0 && goalsFilter?.[1] === Infinity
                        ? ''
                        : `${goalsFilter?.[0] === 0 ? 'Min' : localGoalsFilter?.[0] ?? ''} ${goalsFilter?.[1] === Infinity ? 'Max' : localGoalsFilter?.[1] ?? ''}`}
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
                            value={localGoalsFilter?.[0] === 0 ? '' : String(localGoalsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setLocalGoalsFilter, 0, e, localGoalsFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={localGoalsFilter?.[1] === Infinity ? '' : String(localGoalsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setLocalGoalsFilter, 1, e, localGoalsFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todos os Gols
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
