export type Position = 'A' | 'D' | 'M' | 'G';

export type Athlete = {
    id: number;
    name: string;
    club_id: number | null; // Changed to club_id and made nullable
    clubName?: string;
    position: Position;
    age: number;
    goals?: number;
    salary?: number;
    injuries?: number;
    yellow_cards?: number; // Changed to yellow_cards
    red_cards?: number; // Changed to red_cards
    wrongPasses?: number;
    correctPasses?: number;
    jersey_number?: number | null;
    height?: number;
    weight?: number;
    nationality?: string;
    games?: number;
    substitute_appearances?: number;
    assists?: number;
    shots?: number;
    shots_on_goal?: number;
    fouls_committed?: number;
    fouls_suffered?: number;
    defenses?: number;
    goals_conceded?: number;
    player_type?: string; // Added player_type
    updated_at?: string; // Added updated_at
    image_url?: string; // Added image_url
    bodyFat?: number;
    muscle?: number;
    labData?: {
        hdl: number;
        ldl: number;
        totalCholesterol: number;
        triglycerides: number;
    };
    progress?: Array<{
        week: string;
        weight: number;
        bodyFat: number;
        muscle: number;
    }>;
};

export type Player = {
    id: number;
    name: string;
    jerseyNumber?: number | null;
    position: string;
    age: number;
    height?: number;
    weight?: number;
    nationality?: string;
    games?: number;
    substitutions?: number;
    saves?: number;
    goalsConceded?: number;
    cleanSheets?: number;
    goals?: number;
    assists?: number;
    tackles?: number;
    chancesCreated?: number;
    foulsCommitted?: number;
    foulsSuffered?: number;
    yellowCards?: number;
    redCards?: number;
    club_id?: number | null;
    player_type?: string;
};

export type Club = {
    id: number; // Changed from string to number to match backend ClubSimpleResponse
    name: string;
    initials: string;
    city: string;
    country: string;
    shield_image_url?: string; // Changed from shieldId to shield_image_url
    foundation_date?: string; // Changed from foundationDate to foundation_date
    br_titles: number; // Changed from brTitles to br_titles
    espn_url?: string; // Added espn_url
    banner_image_url?: string; // Added banner_image_url
};

export type AthleteInClub = {
    id: string;
    name: string;
    position: string;
    club: string;
    age: number;
    avatarId: string;
};

export interface ClubSimpleResponse {
    id: number;
    name: string;
    initials: string;
    city: string;
    country: string; // Added country property
    shield_image_url?: string;
    foundation_date?: string; // Assuming string format for date from backend
    br_titles: number;
    espn_url?: string;
    training_center?: string; // Adicionado para centro de treinamento
    banner_image_url?: string; // Adicionado para URL do banner
}

export interface ClubDetailsResponse extends ClubSimpleResponse {}

export interface User {
    id: number;
    name: string;
    email: string;
    profile_image_url?: string;
    subscription_status: 'free' | 'premium';
    profession?: string;
}

export interface GoalkeeperResponse {
    id: number;
    name: string;
    position: string;
    age: number;
    height?: number;
    weight?: number;
    nationality?: string;
    games?: number;
    substitutions?: number;
    saves?: number;
    goals_conceded?: number;
    assists?: number;
    fouls_committed?: number;
    fouls_suffered?: number;
    yellow_cards?: number;
    red_cards?: number;
    club_id: number;
    club: ClubSimpleResponse | null; // Added club property, explicitly nullable
    jersey_number: number | null; // Added jersey_number for goalkeepers, explicitly nullable
    player_type: 'goalkeeper'; // Added player_type
}

export interface FieldPlayerResponse {
    id: number;
    name: string;
    position: string;
    age: number;
    height?: number;
    weight?: number;
    nationality?: string;
    games?: number;
    substitutions?: number;
    goals?: number;
    assists?: number;
    total_shots?: number;
    shots_on_goal?: number;
    fouls_committed?: number;
    fouls_suffered?: number;
    yellow_cards?: number;
    red_cards?: number;
    club_id: number;
    club: ClubSimpleResponse | null; // Added club property, explicitly nullable
    jersey_number: number | null; // Added jersey_number for field players, explicitly nullable
    player_type: 'field_player'; // Added player_type
}

export type TeamStats = {
  name: string;
  p: number; // Pontos
  j: number; // Jogos
  v: number; // Vitórias
  e: number; // Empates
  d: number; // Derrotas
  gp: number; // Gols Pró
  gc: number; // Gols Contra
  sg: number; // Saldo de Gols
};

export type SortKey = keyof Omit<TeamStats, 'name'>;
