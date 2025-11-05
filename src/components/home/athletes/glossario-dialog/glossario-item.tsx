import React from 'react';
import {
    UserIcon,
    RulerIcon,
    WeightIcon,
    FlagIcon,
    ShirtIcon,
    ArrowRightLeftIcon,
    HandshakeIcon,
    CrosshairIcon,
    TargetIcon,
    ShieldAlertIcon,
    GavelIcon,
    ScaleIcon,
    CreditCardIcon,
    SquareSlashIcon,
    CompassIcon,
    GoalIcon
} from "./glossario-icons";
import styles from "./glossario-item.module.css";

interface GlossarioItemProps {
    iconName: string | null;
    termo: string;
    definicao: string;
    abreviacao?: string;
}

const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    UserIcon,
    RulerIcon,
    WeightIcon,
    FlagIcon,
    ShirtIcon,
    ArrowRightLeftIcon,
    HandshakeIcon,
    CrosshairIcon,
    TargetIcon,
    ShieldAlertIcon,
    GavelIcon,
    ScaleIcon,
    CreditCardIcon,
    SquareSlashIcon,
    CompassIcon,
    GoalIcon
};

export const GlossarioItem = ({ iconName, termo, definicao, abreviacao }: GlossarioItemProps) => {
    const IconComponent = iconName ? IconMap[iconName] : null;
    return (
        <div className={styles.glossarioItemContainer}>
            <span className={styles.term}>
                {IconComponent && <IconComponent className={styles.icon} />}
                {abreviacao || termo}:
            </span>
            <span>{definicao}</span>
        </div>
    );
};
