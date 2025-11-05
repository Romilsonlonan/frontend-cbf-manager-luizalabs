import React from 'react';
import { Button } from '@/components/ui/button';
import styles from './add-player-modal-close-button.module.css';

interface AddPlayerModalCloseButtonProps {
    onClose: () => void;
}

export function AddPlayerModalCloseButton({ onClose }: AddPlayerModalCloseButtonProps) {
    return (
        <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className={styles.closeButton}
        >
            Fechar
        </Button>
    );
}
