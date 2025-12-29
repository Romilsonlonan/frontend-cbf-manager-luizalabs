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
import { SquareSlash } from "lucide-react";
import commonStyles from './athletes-filters-common.module.css';

interface AthletesFiltersRedCardsDialogProps {
    redCardsFilter: [number, number];
    setRedCardsFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersRedCardsDialog({
    redCardsFilter,
    setRedCardsFilter,
    handleRangeChange,
}: AthletesFiltersRedCardsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localRedCardsFilter, setLocalRedCardsFilter] = useState(redCardsFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalRedCardsFilter(redCardsFilter);
        }
    }, [isOpen, redCardsFilter]);

    const handleApplyFilter = () => {
        setRedCardsFilter(localRedCardsFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalRedCardsFilter([0, Infinity]);
        setRedCardsFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className={commonStyles.triggerButton}>
                    <SquareSlash className={commonStyles.icon} />
                    CV {redCardsFilter?.[0] === 0 && redCardsFilter?.[1] === Infinity
                        ? ''
                        : `${redCardsFilter?.[0] === 0 ? 'Min' : localRedCardsFilter?.[0] ?? ''} ${redCardsFilter?.[1] === Infinity ? 'Max' : localRedCardsFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Cartões Vermelhos</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <div className={commonStyles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={localRedCardsFilter?.[0] === 0 ? '' : String(localRedCardsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setLocalRedCardsFilter, 0, e, localRedCardsFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={localRedCardsFilter?.[1] === Infinity ? '' : String(localRedCardsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setLocalRedCardsFilter, 1, e, localRedCardsFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todos os Cartões Vermelhos
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
