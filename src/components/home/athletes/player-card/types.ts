import { Athlete as BaseAthlete } from "@/lib/types";

export interface Athlete extends BaseAthlete {
    club_id: number | null;
    clubName?: string;
    player_type?: string;
    updated_at?: string;
}

export interface PlayerAvatarProps {
    jerseyNumber: number | null | undefined;
}

export interface PlayerInfoProps {
    name: string | undefined;
    position: string | undefined;
    age: number | undefined;
}

export interface PlayerStatsGridProps {
    nationality: string | undefined;
    height: number | undefined;
    weight: number | undefined;
    games: number | undefined;
}

export interface PlayerPerformanceProps {
    playerType: string | undefined;
    goals: number | undefined;
    assists: number | undefined;
    defenses: number | undefined;
    goalsConceded: number | undefined;
}

export interface PlayerCardsProps {
    yellowCards: number | undefined;
    redCards: number | undefined;
}

export interface StatsDisplayProps {
    label: string;
    value: number | undefined;
    colorClass: string;
}
