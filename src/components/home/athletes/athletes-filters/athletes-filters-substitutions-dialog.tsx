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
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost-transparent" className={commonStyles.triggerButton}>
                    <ArrowRightLeft className={commonStyles.icon} />
                    SUB {substituteAppearancesFilter?.[0] === 0 && substituteAppearancesFilter?.[1] === Infinity
                        ? ''
                        : `${substituteAppearancesFilter?.[0] === 0 ? 'Min' : substituteAppearancesFilter?.[0] ?? ''} ${substituteAppearancesFilter?.[1] === Infinity ? 'Max' : substituteAppearancesFilter?.[1] ?? ''}`}
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
                            value={substituteAppearancesFilter?.[0] === 0 ? '' : String(substituteAppearancesFilter?.[0] || '')}
                            onChange={(e) => handleRangeChange(setSubstituteAppearancesFilter, 0, e, substituteAppearancesFilter)}
                            className={commonStyles.inputHalf}
                        />
                        <Input
                            type="number"
                            placeholder="Max"
                            value={substituteAppearancesFilter?.[1] === Infinity ? '' : String(substituteAppearancesFilter?.[1] || '')}
                            onChange={(e) => handleRangeChange(setSubstituteAppearancesFilter, 1, e, substituteAppearancesFilter)}
                            className={commonStyles.inputHalf}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setSubstituteAppearancesFilter([0, Infinity])}
                        className={commonStyles.fullWidthButton}
                    >
                        Substituições
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
