import { StatsDisplayProps } from "./types";
import styles from "./stats-display.module.css";

export const StatsDisplay = ({ label, value, colorClass }: StatsDisplayProps) => (
    <div className={styles.statsDisplayContainer}>
        <p className={`${styles.value} ${colorClass}`}>{value ?? 0}</p>
        <p className={styles.label}>{label}</p>
    </div>
);
