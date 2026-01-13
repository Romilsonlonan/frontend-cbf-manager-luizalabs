export interface TrainingRoutine {
  id: number;
  club_id: number;
  day_of_week: string;
  time: string;
  activity: string;
  description?: string;
}

export interface NewRoutine {
  day_of_week: string;
  time: string;
  activity: string;
  description: string;
}

export const DAYS_OF_WEEK = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
];
