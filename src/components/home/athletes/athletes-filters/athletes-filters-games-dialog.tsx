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
import { Shirt } from "lucide-react";
import commonStyles from './athletes-filters-common.module.css';

interface AthletesFiltersGamesDialogProps {
    gamesFilter: [number, number];
    setGamesFilter: (value: [number, number]) => void;
    handleRangeChange: (
        setter: (value: [number, number]) => void,
        index: 0 | 1,
        e: React.ChangeEvent<HTMLInputElement>,
        currentValue: [number, number]
    ) => void;
}

export function AthletesFiltersGamesDialog({
    gamesFilter,
    setGamesFilter,
    handleRangeChange,
}: AthletesFiltersGamesDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localGamesFilter, setLocalGamesFilter] = useState(gamesFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalGamesFilter(gamesFilter);
        }
    }, [isOpen, gamesFilter]);

    const handleApplyFilter = () => {
        setGamesFilter(localGamesFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalGamesFilter([0, Infinity]);
        setGamesFilter([0, Infinity]);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost-transparent" className={commonStyles.triggerButton}>
                    <Shirt className={commonStyles.icon} />
                    J{gamesFilter?.[0] === 0 && gamesFilter?.[1] === Infinity
                        ? ''
                        : `${gamesFilter?.[0] === 0 ? 'Min' : localGamesFilter?.[0] ?? ''} ${gamesFilter?.[1] === Infinity ? 'Max' : localGamesFilter?.[1] ?? ''}`}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Jogos</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <div className={commonStyles.inputGroup}>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={localGamesFilter?.[0] === 0 ? '' : String(localGamesFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setLocalGamesFilter, 0, e, localGamesFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={localGamesFilter?.[1] === Infinity ? '' : String(localGamesFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setLocalGamesFilter, 1, e, localGamesFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todos os Jogos
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
