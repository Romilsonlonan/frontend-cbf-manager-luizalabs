import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import styles from './athletes-filters-yellow-button.module.css';

interface AthletesFiltersYellowButtonProps {
    yellowCardsFilter: [number, number];
}

export const AthletesFiltersYellowButton: React.FC<AthletesFiltersYellowButtonProps> = ({ yellowCardsFilter }) => {
    const label = yellowCardsFilter?.[0] === 0 && yellowCardsFilter?.[1] === Infinity
        ? ''
        : `${yellowCardsFilter?.[0] === 0 ? 'Min' : yellowCardsFilter?.[0] ?? ''}  ${yellowCardsFilter?.[1] === Infinity ? 'Max' : yellowCardsFilter?.[1] ?? ''}`;

    return (
        <Button variant="outline" className={styles.triggerButton}>
            <CreditCard className={styles.icon} />
            CA {label}
        </Button>
    );
};
