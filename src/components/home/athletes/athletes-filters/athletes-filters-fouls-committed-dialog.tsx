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
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <Gavel className={commonStyles.icon} />
                    FC {foulsCommittedFilter?.[0] === 0 && foulsCommittedFilter?.[1] === Infinity
                        ? ''
                        : `${foulsCommittedFilter?.[0] === 0 ? 'Min' : foulsCommittedFilter?.[0] ?? ''} ${foulsCommittedFilter?.[1] === Infinity ? 'Max' : foulsCommittedFilter?.[1] ?? ''}`}
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
                            value={foulsCommittedFilter?.[0] === 0 ? '' : String(foulsCommittedFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setFoulsCommittedFilter, 0, e, foulsCommittedFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={foulsCommittedFilter?.[1] === Infinity ? '' : String(foulsCommittedFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setFoulsCommittedFilter, 1, e, foulsCommittedFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setFoulsCommittedFilter([0, Infinity])}
                        className={commonStyles.fullWidthButton}
                    >
                        Faltas Cometidas
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
