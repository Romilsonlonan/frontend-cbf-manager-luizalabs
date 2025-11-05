import {
    User,
    Ruler,
    Weight,
    Flag,
    Shirt,
    ArrowRightLeft,
    Handshake,
    Crosshair,
    Target,
    ShieldAlert,
    Gavel,
    Scale,
    CreditCard,
    SquareSlash,
    Compass,
    Goal
} from "lucide-react";

interface IconProps {
    className?: string;
}

export const UserIcon = ({ className }: IconProps) => <User className={className} />;
export const RulerIcon = ({ className }: IconProps) => <Ruler className={className} />;
export const WeightIcon = ({ className }: IconProps) => <Weight className={className} />;
export const FlagIcon = ({ className }: IconProps) => <Flag className={className} />;
export const ShirtIcon = ({ className }: IconProps) => <Shirt className={className} />;
export const ArrowRightLeftIcon = ({ className }: IconProps) => <ArrowRightLeft className={className} />;
export const HandshakeIcon = ({ className }: IconProps) => <Handshake className={className} />;
export const CrosshairIcon = ({ className }: IconProps) => <Crosshair className={className} />;
export const TargetIcon = ({ className }: IconProps) => <Target className={className} />;
export const ShieldAlertIcon = ({ className }: IconProps) => <ShieldAlert className={className} />;
export const GavelIcon = ({ className }: IconProps) => <Gavel className={className} />;
export const ScaleIcon = ({ className }: IconProps) => <Scale className={className} />;
export const CreditCardIcon = ({ className }: IconProps) => <CreditCard className={className} />;
export const SquareSlashIcon = ({ className }: IconProps) => <SquareSlash className={className} />;
export const CompassIcon = ({ className }: IconProps) => <Compass className={className} />;
export const GoalIcon = ({ className }: IconProps) => <Goal className={className} />;
