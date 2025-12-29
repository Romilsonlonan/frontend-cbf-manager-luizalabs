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
import { Gavel } from "lucide-react";
import commonStyles from './athletes-filters-common.module.css';

interface AthletesFiltersFoulsCommittedDialogProps {
    foulsCommittedFilter: [number, number];
    setFoulsCommittedFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersFoulsCommittedDialog({
    foulsCommittedFilter,
    setFoulsCommittedFilter,
    handleRangeChange,
}: AthletesFiltersFoulsCommittedDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localFoulsCommittedFilter, setLocalFoulsCommittedFilter] = useState(foulsCommittedFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalFoulsCommittedFilter(foulsCommittedFilter);
        }
    }, [isOpen, foulsCommittedFilter]);

    const handleApplyFilter = () => {
        setFoulsCommittedFilter(localFoulsCommittedFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalFoulsCommittedFilter([0, Infinity]);
        setFoulsCommittedFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Gavel className={commonStyles.icon} />
                    FC {foulsCommittedFilter?.[0] === 0 && foulsCommittedFilter?.[1] === Infinity
                        ? ''
                        : `${foulsCommittedFilter?.[0] === 0 ? 'Min' : localFoulsCommittedFilter?.[0] ?? ''} ${foulsCommittedFilter?.[1] === Infinity ? 'Max' : localFoulsCommittedFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Faltas Cometidas</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <div className={commonStyles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={localFoulsCommittedFilter?.[0] === 0 ? '' : String(localFoulsCommittedFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setLocalFoulsCommittedFilter, 0, e, localFoulsCommittedFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={localFoulsCommittedFilter?.[1] === Infinity ? '' : String(localFoulsCommittedFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setLocalFoulsCommittedFilter, 1, e, localFoulsCommittedFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Faltas Cometidas
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
