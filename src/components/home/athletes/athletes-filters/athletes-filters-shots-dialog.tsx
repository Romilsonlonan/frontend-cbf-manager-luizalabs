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
    const [isOpen, setIsOpen] = useState(false);
    const [localShotsFilter, setLocalShotsFilter] = useState(shotsFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalShotsFilter(shotsFilter);
        }
    }, [isOpen, shotsFilter]);

    const handleApplyFilter = () => {
        setShotsFilter(localShotsFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalShotsFilter([0, Infinity]);
        setShotsFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Crosshair className={commonStyles.icon} />
                    TC {shotsFilter?.[0] === 0 && shotsFilter?.[1] === Infinity
                        ? ''
                        : `${shotsFilter?.[0] === 0 ? 'Min' : localShotsFilter?.[0] ?? ''} ${shotsFilter?.[1] === Infinity ? 'Max' : localShotsFilter?.[1] ?? ''}`}
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
                            value={localShotsFilter?.[0] === 0 ? '' : String(localShotsFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setLocalShotsFilter, 0, e, localShotsFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={localShotsFilter?.[1] === Infinity ? '' : String(localShotsFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setLocalShotsFilter, 1, e, localShotsFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Tentativas de Cruzamento
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
