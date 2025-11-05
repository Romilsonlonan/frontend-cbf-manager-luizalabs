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
import { User } from 'lucide-react';
import React from 'react';
import { AthletesFiltersNameInput } from './athletes-filters-name-input';
import commonStyles from './athletes-filters-common.module.css';

type AthletesFiltersNameProps = {
    nameFilter: string;
    setNameFilter: (value: string) => void;
};

export function AthletesFiltersName({
    nameFilter,
    setNameFilter,
}: AthletesFiltersNameProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <User className={commonStyles.icon} />
                    Nome {nameFilter ? nameFilter : ''}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Nome</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <AthletesFiltersNameInput
                        nameFilter={nameFilter}
                        setNameFilter={setNameFilter}
                    />
                    <Button
                        variant="ghost"
                        onClick={() => setNameFilter('')}
                        className={commonStyles.fullWidthButton}
                    >
                        Todos os Nomes
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
