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
    const [isOpen, setIsOpen] = useState(false);
    const [localFoulsSufferedFilter, setLocalFoulsSufferedFilter] = useState(foulsSufferedFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalFoulsSufferedFilter(foulsSufferedFilter);
        }
    }, [isOpen, foulsSufferedFilter]);

    const handleApplyFilter = () => {
        setFoulsSufferedFilter(localFoulsSufferedFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalFoulsSufferedFilter([0, Infinity]);
        setFoulsSufferedFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Scale className={commonStyles.icon} />
                    FS {foulsSufferedFilter?.[0] === 0 && foulsSufferedFilter?.[1] === Infinity
                        ? ''
                        : `${foulsSufferedFilter?.[0] === 0 ? 'Min' : localFoulsSufferedFilter?.[0] ?? ''}  ${foulsSufferedFilter?.[1] === Infinity ? 'Max' : localFoulsSufferedFilter?.[1] ?? ''}`}
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
                            value={localFoulsSufferedFilter?.[0] === 0 ? '' : String(localFoulsSufferedFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setLocalFoulsSufferedFilter, 0, e, localFoulsSufferedFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={localFoulsSufferedFilter?.[1] === Infinity ? '' : String(localFoulsSufferedFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setLocalFoulsSufferedFilter, 1, e, localFoulsSufferedFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Faltas Sofridas
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
