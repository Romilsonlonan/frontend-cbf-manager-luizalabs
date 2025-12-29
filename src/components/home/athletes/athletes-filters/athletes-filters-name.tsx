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
import { User } from 'lucide-react';
import React, { useState, useEffect } from 'react';
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
    const [isOpen, setIsOpen] = useState(false);
    const [localNameInput, setLocalNameInput] = useState(nameFilter);

    useEffect(() => {
        if (!isOpen) {
            // When the dialog closes, reset local input to the current applied filter
            setLocalNameInput(nameFilter);
        }
    }, [isOpen, nameFilter]);

    const handleApplyFilter = () => {
        setNameFilter(localNameInput);
        setIsOpen(false);
    };

    const handleClearFilter = () => {
        setLocalNameInput('');
        setNameFilter('');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className={commonStyles.triggerButton}>
                    <User className={commonStyles.icon} />
                    Nome {nameFilter ? `: ${nameFilter}` : ''}
                </Button>
            </DialogTrigger>
            <DialogContent className={commonStyles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Nome</DialogTitle>
                </DialogHeader>
                <div className={commonStyles.filterGrid}>
                    <AthletesFiltersNameInput
                        nameFilter={localNameInput}
                        setNameFilter={setLocalNameInput}
                    />
                    <Button
                        variant="ghost"
                        onClick={handleClearFilter}
                        className={commonStyles.fullWidthButton}
                    >
                        Todos os Nomes
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
