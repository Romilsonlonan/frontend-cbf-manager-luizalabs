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
import { CreditCard } from "lucide-react";
import commonStyles from './athletes-filters-common.module.css';

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
    const [isOpen, setIsOpen] = useState(false);
    const [localYellowCardsFilter, setLocalYellowCardsFilter] = useState(yellowCardsFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalYellowCardsFilter(yellowCardsFilter);
        }
    }, [isOpen, yellowCardsFilter]);

    const handleApplyFilter = () => {
        setYellowCardsFilter(localYellowCardsFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalYellowCardsFilter([0, Infinity]);
        setYellowCardsFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={commonStyles.triggerButton}>
                    <CreditCard className={commonStyles.icon} />
                    CA {yellowCardsFilter?.[0] === 0 && yellowCardsFilter?.[1] === Infinity
                        ? ''
                        : `${yellowCardsFilter?.[0] === 0 ? 'Min' : localYellowCardsFilter?.[0] ?? ''}  ${yellowCardsFilter?.[1] === Infinity ? 'Max' : localYellowCardsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Cartões Amarelos</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <div className={commonStyles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={localYellowCardsFilter?.[0] === 0 ? '' : String(localYellowCardsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setLocalYellowCardsFilter, 0, e, localYellowCardsFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={localYellowCardsFilter?.[1] === Infinity ? '' : String(localYellowCardsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setLocalYellowCardsFilter, 1, e, localYellowCardsFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todos os Cartões Amarelos
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
