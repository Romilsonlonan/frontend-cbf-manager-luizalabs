import type { Athlete, Club, AthleteInClub } from './types';

export const athletes: Athlete[] = [
  {
    id: '1',
    name: 'Carlos Alberto',
    club: 'SC Corinthians',
    position: 'Atacante',
    age: 28,
    goals: 15,
    salary: 150000,
    injuries: 2,
    yellowCards: 4,
    redCards: 1,
    wrongPasses: 25,
    correctPasses: 342
  },
  {
    id: '2',
    name: 'Bruna Santos',
    club: 'SE Palmeiras',
    position: 'Meio-campo',
    age: 25,
    goals: 7,
    salary: 120000,
    injuries: 1,
    yellowCards: 6,
    redCards: 0,
    wrongPasses: 18,
    correctPasses: 298
  },
  {
    id: '3',
    name: 'Ricardo Lima',
    club: 'São Paulo FC',
    position: 'Zagueiro',
    age: 30,
    goals: 2,
    salary: 100000,
    injuries: 3,
    yellowCards: 8,
    redCards: 2,
    wrongPasses: 12,
    correctPasses: 456
  },
  {
    id: '4',
    name: 'Jonas Pereira',
    club: 'SC Corinthians',
    position: 'Goleiro',
    age: 32,
    goals: 0,
    salary: 90000,
    injuries: 1,
    yellowCards: 2,
    redCards: 0,
    wrongPasses: 5,
    correctPasses: 189
  },
  {
    id: '5',
    name: 'Livia Costa',
    club: 'São Paulo FC',
    position: 'Atacante',
    age: 22,
    goals: 18,
    salary: 180000,
    injuries: 0,
    yellowCards: 3,
    redCards: 1,
    wrongPasses: 22,
    correctPasses: 276
  },
  {
    id: '6',
    name: 'Fernanda Alves',
    club: 'SE Palmeiras',
    position: 'Meio-campo',
    age: 24,
    goals: 1,
    salary: 95000,
    injuries: 2,
    yellowCards: 5,
    redCards: 0,
    wrongPasses: 15,
    correctPasses: 234
  },
  {
    id: '7',
    name: 'Lucas Martins',
    club: 'SC Corinthians',
    position: 'Zagueiro',
    age: 26,
    goals: 9,
    salary: 130000,
    injuries: 1,
    yellowCards: 7,
    redCards: 1,
    wrongPasses: 20,
    correctPasses: 310
  },
];

export const clubs: Club[] = [
  {
    id: "1",
    name: "SC Corinthians",
    initials: "COR",
    city: "São Paulo",
    shieldId: "club-logo-1",
    foundationDate: "1910-09-01",
    brTitles: 7,
    trainingCenter: "CT Dr. Joaquim Grava"
  },
  {
    id: "2",
    name: "SE Palmeiras",
    initials: "PAL",
    city: "São Paulo",
    shieldId: "club-logo-2",
    foundationDate: "1914-08-26",
    brTitles: 12,
    trainingCenter: "Academia de Futebol"
  },
  {
    id: "3",
    name: "São Paulo FC",
    initials: "SAO",
    city: "São Paulo",
    shieldId: "club-logo-3",
    foundationDate: "1930-01-25",
    brTitles: 6,
    trainingCenter: "CT da Barra Funda"
  },
];

export const athletesInClubs: AthleteInClub[] = [
  { id: '1', name: 'Carlos Alberto', position: 'Atacante', club: 'SC Corinthians', age: 28, avatarId: 'user-avatar' },
  { id: '4', name: 'Jonas Pereira', position: 'Goleiro', club: 'SC Corinthians', age: 32, avatarId: 'user-avatar' },
  { id: '2', name: 'Bruna Santos', position: 'Meio-campo', club: 'SE Palmeiras', age: 25, avatarId: 'user-avatar' },
  { id: '3', name: 'Ricardo Lima', position: 'Zagueiro', club: 'São Paulo FC', age: 30, avatarId: 'user-avatar' },
  { id: '5', name: 'Livia Costa', position: 'Atacante', club: 'São Paulo FC', age: 22, avatarId: 'user-avatar' },
];

export const positions: string[] = [
  'Atacante',
  'Meio-campo',
  'Zagueiro',
  'Goleiro',
  'Lateral-Direito',
  'Lateral-Esquerdo',
];
