
'use client';

import styles from './statistics.module.css';
import GoalsChart from './goals-chart/goals-chart';
import SalaryChart from './salary-chart/salary-chart';
import AgeDistributionChart from './age-distribution-chart/age-distribution-chart';

// Mock data (o mesmo usado em outras páginas para consistência)
const athletes = [
  {
    id: '1',
    name: 'C. Alberto',
    position: 'Atacante',
    club: 'SC Corinthians',
    age: 28,
    goals: 15,
    salary: 150000,
  },
  {
    id: '2',
    name: 'B. Santos',
    position: 'Meio-campo',
    club: 'SE Palmeiras',
    age: 25,
    goals: 7,
    salary: 120000,
  },
  {
    id: '3',
    name: 'R. Lima',
    position: 'Zagueiro',
    club: 'São Paulo FC',
    age: 30,
    goals: 2,
    salary: 100000,
  },
  {
    id: '4',
    name: 'J. Pereira',
    position: 'Goleiro',
    club: 'SC Corinthians',
    age: 32,
    goals: 0,
    salary: 90000,
  },
  {
    id: '5',
    name: 'L. Costa',
    position: 'Atacante',
    club: 'São Paulo FC',
    age: 22,
    goals: 18,
    salary: 180000,
  },
  {
    id: '6',
    name: 'F. Alves',
    position: 'Lateral-Esquerdo',
    club: 'SE Palmeiras',
    age: 24,
    goals: 1,
    salary: 95000,
  },
  {
    id: '7',
    name: 'L. Martins',
    position: 'Meio-campo',
    club: 'SC Corinthians',
    age: 26,
    goals: 9,
    salary: 130000,
  },
];

export default function Statistics() {
  const goalsData = [...athletes].sort((a, b) => b.goals - a.goals);
  const salaryData = [...athletes].sort((a, b) => b.salary - a.salary);
  const ageData = [...athletes].sort((a, b) => b.age - a.age);

  return (
    <div className={styles.statisticsGrid}>
      <GoalsChart data={goalsData} />
      <SalaryChart data={salaryData} />
      <AgeDistributionChart data={ageData} />
    </div>
  );
}
