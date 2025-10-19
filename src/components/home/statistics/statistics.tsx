
'use client';

import styles from './statistics.module.css';
import GoalsChart from './goals-chart/goals-chart';
import SalaryChart from './salary-chart/salary-chart';
import AgeDistributionChart from './age-distribution-chart/age-distribution-chart';
import { athletes } from '@/lib/mock-data';
import { Athlete } from '@/lib/types';


export default function Statistics() {
  const goalsData = [...athletes].sort((a, b) => b.goals - a.goals);
  const salaryData = [...athletes].sort((a, b) => b.salary - a.salary);
  const ageData = [...athletes].sort((a, b) => a.age - b.age).map(athlete => ({...athlete, name: athlete.name.split(' ')[0]}));

  return (
    <div className={styles.statisticsGrid}>
      <GoalsChart data={goalsData} />
      <SalaryChart data={salaryData} />
      <AgeDistributionChart data={ageData} />
    </div>
  );
}
