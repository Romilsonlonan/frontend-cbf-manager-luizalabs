'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from '@/components/ui/dialog';
import { Globe } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import commonStyles from './athletes-filters-common.module.css';
import { AthletesFiltersNationalityInput } from './athletes-filters-nationality-input';

type AthletesFiltersNationalityProps = {
    nationalityFilter: string;
    setNationalityFilter: (value: string) => void;
};

export function AthletesFiltersNationality({
    nationalityFilter,
    setNationalityFilter,
}: AthletesFiltersNationalityProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localNationalityFilter, setLocalNationalityFilter] = useState(nationalityFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalNationalityFilter(nationalityFilter);
        }
    }, [isOpen, nationalityFilter]);

    const handleApplyFilter = () => {
        setNationalityFilter(localNationalityFilter);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalNationalityFilter('');
        setNationalityFilter('');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost-transparent" className={commonStyles.triggerButton}>
                    <Globe className={commonStyles.icon} />
                    NAC {nationalityFilter ? nationalityFilter : ''}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Nacionalidade</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <AthletesFiltersNationalityInput
                        nationalityFilter={localNationalityFilter}
                        setNationalityFilter={setLocalNationalityFilter}
                    />
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Nacionalidades
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
