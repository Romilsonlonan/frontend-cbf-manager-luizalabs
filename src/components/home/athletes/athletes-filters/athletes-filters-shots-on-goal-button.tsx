import React from 'react';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import styles from './athletes-filters-shots-on-goal-button.module.css';

interface AthletesFiltersShotsOnGoalButtonProps {
    shotsOnGoalFilter: [number, number];
}

export const AthletesFiltersShotsOnGoalButton: React.FC<AthletesFiltersShotsOnGoalButtonProps> = ({ shotsOnGoalFilter }) => {
    const label = shotsOnGoalFilter?.[0] === 0 && shotsOnGoalFilter?.[1] === Infinity
        ? ''
        : `${shotsOnGoalFilter?.[0] === 0 ? 'Min' : shotsOnGoalFilter?.[0] ?? ''} ${shotsOnGoalFilter?.[1] === Infinity ? 'Max' : shotsOnGoalFilter?.[1] ?? ''}`;

    return (
        <Button variant="outline" className={styles.triggerButton}>
            <Target className={styles.icon} />
            CG {label}
        </Button>
    );
};
