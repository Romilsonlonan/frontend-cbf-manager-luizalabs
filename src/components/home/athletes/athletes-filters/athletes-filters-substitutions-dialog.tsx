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
import { ArrowRightLeft } from "lucide-react";
import commonStyles from './athletes-filters-common.module.css';

interface AthletesFiltersSubstitutionsDialogProps {
    substituteAppearancesFilter: [number, number];
    setSubstituteAppearancesFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersSubstitutionsDialog({
    substituteAppearancesFilter,
    setSubstituteAppearancesFilter,
    handleRangeChange,
}: AthletesFiltersSubstitutionsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localSubstituteAppearancesFilter, setLocalSubstituteAppearancesFilter] = useState(substituteAppearancesFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalSubstituteAppearancesFilter(substituteAppearancesFilter);
        }
    }, [isOpen, substituteAppearancesFilter]);

    const handleApplyFilter = () => {
        setSubstituteAppearancesFilter(localSubstituteAppearancesFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalSubstituteAppearancesFilter([0, Infinity]);
        setSubstituteAppearancesFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost-transparent" className={commonStyles.triggerButton}>
                    <ArrowRightLeft className={commonStyles.icon} />
                    SUB {substituteAppearancesFilter?.[0] === 0 && substituteAppearancesFilter?.[1] === Infinity
                        ? ''
                        : `${substituteAppearancesFilter?.[0] === 0 ? 'Min' : localSubstituteAppearancesFilter?.[0] ?? ''} ${substituteAppearancesFilter?.[1] === Infinity ? 'Max' : localSubstituteAppearancesFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Substituições</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <div className={commonStyles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={localSubstituteAppearancesFilter?.[0] === 0 ? '' : String(localSubstituteAppearancesFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setLocalSubstituteAppearancesFilter, 0, e, localSubstituteAppearancesFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={localSubstituteAppearancesFilter?.[1] === Infinity ? '' : String(localSubstituteAppearancesFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setLocalSubstituteAppearancesFilter, 1, e, localSubstituteAppearancesFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Substituições
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
