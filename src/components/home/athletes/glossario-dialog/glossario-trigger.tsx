import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import styles from "./glossario-trigger.module.css";

export const GlossarioTrigger = () => (
    <DialogTrigger asChild>
        <Button variant="outline" className={styles.triggerButton}>
            <Info className={styles.icon} />
            Glossário de Atletas
        </Button>
    </DialogTrigger>
);
