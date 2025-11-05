'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Globe } from 'lucide-react';
import React from 'react';
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
    return (
        <Dialog>
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
                        nationalityFilter={nationalityFilter}
                        setNationalityFilter={setNationalityFilter}
                    />
                    <Button
                        variant="ghost"
                        onClick={() => setNationalityFilter('')}
                        className={commonStyles.fullWidthButton}
                    >
                        Todas as Nacionalidades
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
