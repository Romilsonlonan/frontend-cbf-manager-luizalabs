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
import styles from './athletes-filters-nationality.module.css';
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
                <Button variant="ghost-transparent" className={styles.triggerButton}>
                    <Globe className={styles.icon} />
                    NAC {nationalityFilter ? nationalityFilter : ''}
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Nacionalidade</DialogTitle>
                </DialogHeader>
                <div className={styles.filterGrid}>
                    <AthletesFiltersNationalityInput
                        nationalityFilter={nationalityFilter}
                        setNationalityFilter={setNationalityFilter}
                    />
                    <Button
                        variant="ghost"
                        onClick={() => setNationalityFilter('')}
                        className={styles.fullWidthButton}
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
