'use client';

import { Button } from '@/components/ui/button';
import { Position } from '@/lib/types';
import React from 'react';
import styles from './athletes-filters-position-input.module.css';

type AthletesFiltersPositionInputProps = {
    positionFilter: (Position | 'all')[];
    setPositionFilter: (value: (Position | 'all')[]) => void;
};

const positionMap: Record<Position, string> = {
    A: 'Ataque',
    D: 'Defesa',
    M: 'Meio',
    G: 'Goleiro',
};

const mainPositions: Position[] = ['A', 'D', 'M', 'G'];
const specificPositions: Position[] = []; // Assuming specific positions will be added here if needed

export function AthletesFiltersPositionInput({
    positionFilter,
    setPositionFilter,
}: AthletesFiltersPositionInputProps) {
    return (
        <>
            <Button
                variant={positionFilter.includes('all') || positionFilter.length === 0 ? 'default' : 'outline'}
                onClick={() => setPositionFilter(['all'])}
                className={styles.fullWidthButton}
            >
                Todas
            </Button>
            <div className={styles.gridCols2}>
                {mainPositions.map((pos) => (
                    <Button
                        key={pos}
                        variant={positionFilter.includes(pos) ? 'default' : 'outline'}
                        onClick={() => {
                            if (positionFilter.includes(pos)) {
                                const newFilter = positionFilter.filter((item) => item !== pos);
                                setPositionFilter(newFilter.length === 0 ? ['all'] : newFilter);
                            } else {
                                setPositionFilter(positionFilter.filter(item => item !== 'all').concat(pos));
                            }
                        }}
                    >
                        {positionMap[pos]}
                    </Button>
                ))}
            </div>
            <div className={styles.gridCols2}>
                {specificPositions.map((pos) => (
                    <Button
                        key={pos}
                        variant={positionFilter.includes(pos) ? 'default' : 'outline'}
                        onClick={() => {
                            if (positionFilter.includes(pos)) {
                                const newFilter = positionFilter.filter((item) => item !== pos);
                                setPositionFilter(newFilter.length === 0 ? ['all'] : newFilter);
                            } else {
                                setPositionFilter(positionFilter.filter(item => item !== 'all').concat(pos));
                            }
                        }}
                    >
                        {positionMap[pos]}
                    </Button>
                ))}
            </div>
        </>
    );
}
