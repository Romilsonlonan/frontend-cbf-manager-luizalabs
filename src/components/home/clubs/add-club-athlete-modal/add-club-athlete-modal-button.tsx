"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import styles from "./add-club-athlete-modal-button.module.css";

interface AddClubAthleteModalButtonProps {
    loading: boolean;
}

export function AddClubAthleteModalButton({ loading }: AddClubAthleteModalButtonProps) {
    return (
        <Button type="submit" disabled={loading}>
            {loading ? (
                <>
                    <Loader2 className={styles.spinnerIcon} />
                    Adicionando...
                </>
            ) : (
                'Adicionar ao Elenco'
            )}
        </Button>
    );
}
