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
    jersey_number?: number;
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
};

export type Club = {
    id: number; // Changed from string to number to match backend ClubSimpleResponse
    name: string;
    initials: string;
    city: string;
    shield_image_url?: string; // Changed from shieldId to shield_image_url
    foundation_date?: string; // Changed from foundationDate to foundation_date
    br_titles: number; // Changed from brTitles to br_titles
    espn_url?: string; // Added espn_url
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
    shield_image_url?: string;
    foundation_date?: string; // Assuming string format for date from backend
    br_titles: number;
    espn_url?: string;
}


export interface PlayerResponse {
    id: number;
    name: string;
    jersey_number?: number;
    position: Position;
    age: number;
    height?: number;
    weight?: number;
    nationality?: string;
    games?: number;
    substitute_appearances?: number;
    goals?: number;
    assists?: number;
    shots?: number;
    shots_on_goal?: number;
    fouls_committed?: number;
    fouls_suffered?: number;
    yellow_cards?: number;
    red_cards?: number;
    defenses?: number;
    goals_conceded?: number;
    club_id: number | null; // Made nullable
    club?: ClubSimpleResponse;
    player_type?: string; // Added player_type
    updated_at?: string; // Added updated_at
}
