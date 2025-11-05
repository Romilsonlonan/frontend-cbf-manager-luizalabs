import { PlayerInfoProps } from "./types";
import styles from "./player-info.module.css";

export const PlayerInfo = ({ name, position, age }: PlayerInfoProps) => (
    <div className={styles.playerInfoContainer}>
        <h3 className={styles.playerName}>{name}</h3>
        <p className={styles.playerDetails}>{position}</p>
        <p className={styles.playerDetails}>{age} anos</p>
    </div>
);
