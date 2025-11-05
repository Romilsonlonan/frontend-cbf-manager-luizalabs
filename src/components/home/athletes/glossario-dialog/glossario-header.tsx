import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import styles from "./glossario-header.module.css";

interface GlossarioHeaderProps {
    title: string;
    description: string;
}

export const GlossarioHeader = ({ title, description }: GlossarioHeaderProps) => (
    <DialogHeader>
        <DialogTitle className={styles.dialogTitle}>
            <User className={styles.icon} /> {title}
        </DialogTitle>
        <DialogDescription>
            {description}
        </DialogDescription>
    </DialogHeader>
);
