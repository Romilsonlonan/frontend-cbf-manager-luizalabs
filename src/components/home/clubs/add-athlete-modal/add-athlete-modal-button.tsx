"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import styles from "./add-athlete-modal-button.module.css";

interface AddAthleteModalButtonProps {
    onClick: () => void;
}

export function AddAthleteModalButton({ onClick }: AddAthleteModalButtonProps) {
    return (
        <Button onClick={onClick} className={styles.addButton}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Atleta
        </Button>
    );
}
