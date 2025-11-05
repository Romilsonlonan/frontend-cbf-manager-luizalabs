import React from 'react';
import { Button } from '@/components/ui/button';
import { Weight } from 'lucide-react';
import styles from './athletes-filters-weight-button.module.css';

interface AthletesFiltersWeightButtonProps {
    weightFilter: [number, number];
}

export const AthletesFiltersWeightButton: React.FC<AthletesFiltersWeightButtonProps> = ({ weightFilter }) => {
    const label = weightFilter?.[0] === 0 && weightFilter?.[1] === Infinity
        ? ''
        : `${weightFilter?.[0] === 0 ? 'Min' : weightFilter?.[0] ?? ''} ${weightFilter?.[1] === Infinity ? 'Max' : weightFilter?.[1] ?? ''}`;

    return (
        <Button variant="ghost-transparent" className={styles.triggerButton}>
            <Weight className={styles.icon} />
            P {label}
        </Button>
    );
};
