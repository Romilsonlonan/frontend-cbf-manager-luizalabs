import { Calendar, MapPin, TrendingUp, Users } from "lucide-react";
import { PlayerStatsGridProps } from "./types";
import styles from "./player-stats-grid.module.css";

export const PlayerStatsGrid = ({ nationality, height, weight, games }: PlayerStatsGridProps) => (
    <div className={styles.playerStatsGridContainer}>
        <div className={styles.statItem}>
            <MapPin className={styles.statIcon} />
            <span>{nationality ?? 'N/A'}</span>
        </div>
        <div className={styles.statItem}>
            <TrendingUp className={styles.statIcon} />
            <span>{(height ?? 0)}m • {(weight ?? 0)}kg</span>
        </div>
        <div className={styles.statItem}>
            <Users className={styles.statIcon} />
            <span>{(games ?? 0)} jogos</span>
        </div>
    </div>
);
