import { PlayerPerformanceProps } from "./types";
import { StatsDisplay } from "./stats-display";
import styles from "./player-performance.module.css";

export const PlayerPerformance = ({ playerType, goals, assists, defenses, goalsConceded }: PlayerPerformanceProps) => (
    <div className={styles.playerPerformanceContainer}>
        {playerType === "goleiro" ? (
            <>
                <StatsDisplay label="Defesas" value={defenses} colorClass="text-blue-600" />
                <StatsDisplay label="Gols sofridos" value={goalsConceded} colorClass="text-red-600" />
            </>
        ) : (
            <>
                <StatsDisplay label="Gols" value={goals} colorClass="text-green-600" />
                <StatsDisplay label="Assistências" value={assists} colorClass="text-blue-600" />
            </>
        )}
    </div>
);
