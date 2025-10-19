
import type { Athlete, Club, AthleteInClub } from './types';

export const athletes: Athlete[] = [
    {
      id: '1',
      name: 'Carlos Alberto',
      position: 'Atacante',
      club: 'SC Corinthians',
      age: 28,
      goals: 15,
      salary: 150000,
      trainingCenter: 'CT Dr. Joaquim Grava',
    },
    {
      id: '2',
      name: 'Bruna Santos',
      position: 'Meio-campo',
      club: 'SE Palmeiras',
      age: 25,
      goals: 7,
      salary: 120000,
      trainingCenter: 'Academia de Futebol',
    },
    {
      id: '3',
      name: 'Ricardo Lima',
      position: 'Zagueiro',
      club: 'São Paulo FC',
      age: 30,
      goals: 2,
      salary: 100000,
      trainingCenter: 'CT da Barra Funda',
    },
    {
      id: '4',
      name: 'Jonas Pereira',
      position: 'Goleiro',
      club: 'SC Corinthians',
      age: 32,
      goals: 0,
      salary: 90000,
      trainingCenter: 'CT Dr. Joaquim Grava',
    },
     {
      id: '5',
      name: 'Livia Costa',
      position: 'Atacante',
      club: 'São Paulo FC',
      age: 22,
      goals: 18,
      salary: 180000,
      trainingCenter: 'CT da Barra Funda',
    },
      {
      id: '6',
      name: 'Fernanda Alves',
      position: 'Lateral-Esquerdo',
      club: 'SE Palmeiras',
      age: 24,
      goals: 1,
      salary: 95000,
      trainingCenter: 'Academia de Futebol',
    },
    {
      id: '7',
      name: 'Lucas Martins',
      position: 'Meio-campo',
      club: 'SC Corinthians',
      age: 26,
      goals: 9,
      salary: 130000,
      trainingCenter: 'CT Dr. Joaquim Grava',
    },
  ];

export const clubs: Club[] = [
    {
      id: "1",
      name: "SC Corinthians",
      initials: "COR",
      city: "São Paulo",
      shieldId: "club-logo-1",
    },
    {
      id: "2",
      name: "SE Palmeiras",
      initials: "PAL",
      city: "São Paulo",
      shieldId: "club-logo-2",
    },
    {
      id: "3",
      name: "São Paulo FC",
      initials: "SAO",
      city: "São Paulo",
      shieldId: "club-logo-3",
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

export const trainingCenters: string[] = ['CT Dr. Joaquim Grava', 'Academia de Futebol', 'CT da Barra Funda'];
