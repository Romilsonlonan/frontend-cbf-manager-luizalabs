import type { Player, PlayerStatsColumn, Category } from '@/lib/definitions';

export const categories: Category[] = ['Goleiros', 'Defensores', 'Meio-campistas', 'Atacantes'];

export const playerCategoryMap: Record<string, Category> = {
  'Goleiro': 'Goleiros',
  'Defensor': 'Defensores',
  'Meio-Campista': 'Meio-campistas',
  'Atacante': 'Atacantes',
};

export const baseColumnKeys = ['name', 'position', 'age', 'height', 'weight', 'nationality', 'games', 'substitutions', 'yellowCards', 'redCards'] as const;
export const baseColumnKeysSet: Set<Exclude<keyof Player, 'id' | 'imageUrl'>> = new Set(baseColumnKeys);
export const goalkeeperStatKeys = ['saves', 'goalsConceded', 'assists', 'foulsCommitted', 'foulsSuffered'] as const;
export const fieldPlayerStatKeys = ['goals', 'assists', 'tackles', 'chancesCreated', 'foulsCommitted', 'foulsSuffered'] as const;

export const allStatsColumns: PlayerStatsColumn[] = [
  { key: 'name', name: 'Nome', isSortable: true },
  { key: 'position', name: 'POS', isSortable: true },
  { key: 'age', name: 'Idade', isSortable: true },
  { key: 'height', name: 'Alt', isSortable: true },
  { key: 'weight', name: 'P', isSortable: true },
  { key: 'nationality', name: 'NAC', isSortable: true },
  { key: 'games', name: 'J', isSortable: true },
  { key: 'substitutions', name: 'SUB', isSortable: true },
  { key: 'saves', name: 'D', isSortable: true },
  { key: 'goals_conceded', name: 'GS', isSortable: true },
  { key: 'goals', name: 'G', isSortable: true },
  { key: 'assists', name: 'A', isSortable: true },
  { key: 'total_shots', name: 'TC', isSortable: true },
  { key: 'shots_on_goal', name: 'CG', isSortable: true },
  { key: 'fouls_committed', name: 'FC', isSortable: true },
  { key: 'fouls_suffered', name: 'FS', isSortable: true },
  { key: 'yellow_cards', name: 'CA', isSortable: true },
  { key: 'red_cards', name: 'CV', isSortable: true },
];

export const players: Player[] = [];
