import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlayerAvatarProps } from "./types";
import styles from "./player-avatar.module.css";

export const PlayerAvatar = ({ jerseyNumber }: PlayerAvatarProps) => (
    <Avatar className={styles.avatar}>
        <AvatarFallback className={styles.avatarFallback}>
            {jerseyNumber || "?"}
        </AvatarFallback>
    </Avatar>
);
