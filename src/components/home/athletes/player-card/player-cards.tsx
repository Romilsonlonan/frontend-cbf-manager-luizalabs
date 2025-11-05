import { Badge } from "@/components/ui/badge";
import { PlayerCardsProps } from "./types";
import styles from "./player-cards.module.css";

export const PlayerCards = ({ yellowCards, redCards }: PlayerCardsProps) => (
    <div className={styles.playerCardsContainer}>
        {(yellowCards ?? 0) > 0 && (
            <Badge variant="secondary" className={styles.yellowCardBadge}>
                🟨 {yellowCards}
            </Badge>
        )}
        {(redCards ?? 0) > 0 && (
            <Badge variant="secondary" className={styles.redCardBadge}>
                🟥 {redCards}
            </Badge>
        )}
    </div>
);
