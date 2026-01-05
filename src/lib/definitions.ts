export type Category = 'Todos' | 'Goleiros' | 'Defensores' | 'Meio-campistas' | 'Atacantes';

export type Player = {
  id: number;
  name: string;
  jerseyNumber?: number | null;
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
  club_id?: number | null; // Made optional and nullable
  goals_conceded?: number;
  total_shots?: number;
  shots_on_goal?: number;
  fouls_committed?: number;
  fouls_suffered?: number;
  yellow_cards?: number;
  red_cards?: number;
};

export type PlayerStatsColumn = {
  key: Exclude<keyof Player, 'id' | 'imageUrl'>;
  name: string;
  isSortable: boolean;
};

export interface Club {
  id: number;
  name: string;
  country: string;
  initials?: string;
  city?: string;
  shield_image_url?: string;
  foundation_date?: string;
  br_titles?: number;
  espn_url?: string;
  training_center?: string;
  banner_image_url?: string;
}
