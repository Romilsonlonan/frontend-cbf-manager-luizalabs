'use client';

import styles from './statistics.module.css';
import GoalsChart from './goals-chart/goals-chart';
import AgeDistributionChart from './age-distribution-chart/age-distribution-chart';
import { athletes } from '@/lib/mock-data';

export default function Statistics() {
  // Filtrar atletas que possuem os dados necessários para evitar erros de tipo
  const goalsData = [...athletes]
    .filter(a => (a as any).goals !== undefined)
    .sort((a, b) => (b as any).goals - (a as any).goals);
    
  const ageData = [...athletes]
    .filter(a => (a as any).age !== undefined)
    .sort((a, b) => (a as any).age - (b as any).age)
    .map(athlete => ({...athlete, name: athlete.name.split(' ')[0]}));

  return (
    <div className={styles.statisticsGrid}>
      <GoalsChart data={goalsData as any} />
      <AgeDistributionChart data={ageData as any} />
    </div>
  );
}
