export type Category = 'Todos' | 'Goleiros' | 'Defensores' | 'Meio-campistas' | 'Atacantes';

export type Player = {
  id: number;
  name: string;
  jerseyNumber?: number;
  position: string;
  age: number;
  height?: number; // Made optional
  weight?: number; // Made optional
  nationality?: string;
  games?: number; // Made optional
  substitutions?: number; // Made optional
  saves?: number; // Made optional
  goalsConceded?: number; // Made optional
  cleanSheets?: number; // Made optional
  goals?: number; // Made optional
  assists?: number; // Made optional
  tackles?: number; // Made optional
  chancesCreated?: number; // Made optional
  foulsCommitted?: number; // Made optional
  foulsSuffered?: number; // Made optional
  yellowCards?: number; // Made optional
  redCards?: number; // Made optional
  imageUrl?: string;
  club_id?: number | null; // Made optional and nullable
};

export type PlayerStatsColumn = {
  key: Exclude<keyof Player, 'id' | 'imageUrl'>;
  name: string;
  isSortable: boolean;
};
