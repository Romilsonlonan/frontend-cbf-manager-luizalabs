import React from 'react';
import { Button } from '@/components/ui/button';
import { Shirt } from 'lucide-react';
import styles from './athletes-filters-games-button.module.css';

interface AthletesFiltersGamesButtonProps {
    gamesFilter: [number, number];
}

export const AthletesFiltersGamesButton: React.FC<AthletesFiltersGamesButtonProps> = ({ gamesFilter }) => {
    const label = gamesFilter?.[0] === 0 && gamesFilter?.[1] === Infinity
        ? ''
        : `${gamesFilter?.[0] === 0 ? 'Min' : gamesFilter?.[0] ?? ''} ${gamesFilter?.[1] === Infinity ? 'Max' : gamesFilter?.[1] ?? ''}`;

    return (
        <Button variant="outline" className={styles.triggerButton}>
            <Shirt className={styles.icon} />
            J{label}
        </Button>
    );
};
