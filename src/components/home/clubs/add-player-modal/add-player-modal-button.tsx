import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import styles from './add-player-modal-button.module.css';

interface AddPlayerModalButtonProps {
    loading: boolean;
    onCancel: () => void;
}

export function AddPlayerModalButton({ loading, onCancel }: AddPlayerModalButtonProps) {
    return (
        <div className={styles.actionsContainer}>
            <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
            >
                Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className={styles.spinnerIcon} />
                        Adicionando...
                    </>
                ) : (
                    'Adicionar Jogador'
                )}
            </Button>
        </div>
    );
}
