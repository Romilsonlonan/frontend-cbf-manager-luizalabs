'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-name-input.module.css';

type AthletesFiltersNameInputProps = {
    nameFilter: string;
    setNameFilter: (value: string) => void;
};

export function AthletesFiltersNameInput({
    nameFilter,
    setNameFilter,
}: AthletesFiltersNameInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="text"
                placeholder="Nome do Atleta"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className={styles.inputFull}
            />
        </div>
    );
}
