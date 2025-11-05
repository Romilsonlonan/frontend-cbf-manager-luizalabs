'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import styles from './athletes-filters-nationality-input.module.css';

type AthletesFiltersNationalityInputProps = {
    nationalityFilter: string;
    setNationalityFilter: (value: string) => void;
};

export function AthletesFiltersNationalityInput({
    nationalityFilter,
    setNationalityFilter,
}: AthletesFiltersNationalityInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Input
                type="text"
                placeholder="Nacionalidade"
                value={nationalityFilter}
                onChange={(e) => setNationalityFilter(e.target.value)}
                className={styles.inputFull}
            />
        </div>
    );
}
