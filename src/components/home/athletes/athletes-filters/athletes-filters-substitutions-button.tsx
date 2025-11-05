import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft } from 'lucide-react';
import styles from './athletes-filters-substitutions-button.module.css';

interface AthletesFiltersSubstitutionsButtonProps {
    substituteAppearancesFilter: [number, number];
}

export const AthletesFiltersSubstitutionsButton: React.FC<AthletesFiltersSubstitutionsButtonProps> = ({ substituteAppearancesFilter }) => {
    const label = substituteAppearancesFilter?.[0] === 0 && substituteAppearancesFilter?.[1] === Infinity
        ? ''
        : `${substituteAppearancesFilter?.[0] === 0 ? 'Min' : substituteAppearancesFilter?.[0] ?? ''} ${substituteAppearancesFilter?.[1] === Infinity ? 'Max' : substituteAppearancesFilter?.[1] ?? ''}`;

    return (
        <Button variant="outline" className={styles.triggerButton}>
            <ArrowRightLeft className={styles.icon} />
            SUB {label}
        </Button>
    );
};
