import { Card, CardContent } from "@/components/ui/card";
import { Athlete } from "./types";
import { PlayerAvatar } from "./player-avatar";
import { PlayerInfo } from "./player-info";
import { PlayerStatsGrid } from "./player-stats-grid";
import { PlayerPerformance } from "./player-performance";
import { PlayerCards } from "./player-cards";
import styles from "./player-card.module.css";

export const PlayerCard = ({ player }: { player: Athlete }) => (
    <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
            <div className={styles.cardInnerContainer}>
                <PlayerAvatar jerseyNumber={player.jersey_number} />

                <div className={styles.playerDetailsContainer}>
                    <PlayerInfo name={player.name} position={player.position} age={player.age} />
                    <PlayerStatsGrid
                        nationality={player.nationality}
                        height={player.height}
                        weight={player.weight}
                        games={player.games}
                    />
                    <PlayerPerformance
                        playerType={player.player_type}
                        goals={player.goals}
                        assists={player.assists}
                        defenses={player.defenses}
                        goalsConceded={player.goals_conceded}
                    />
                    <PlayerCards
                        yellowCards={player.yellow_cards}
                        redCards={player.red_cards}
                    />
                </div>
            </div>
        </CardContent>
    </Card>
);
