import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import styles from './loading-dialog.module.css';

type LoadingDialogProps = {
    isOpen: boolean;
    title?: string;
    description?: string;
};

export const LoadingDialog = ({
    isOpen,
    title = 'Carregando...',
    description = 'Por favor, aguarde enquanto processamos sua solicitação.',
}: LoadingDialogProps) => {
    return (
        <Dialog open={isOpen}>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader className={styles.dialogHeader}>
                    <Loader2 className={styles.spinner} />
                    <DialogTitle className={styles.dialogTitle}>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
