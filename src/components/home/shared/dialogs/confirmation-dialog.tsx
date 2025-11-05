import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import styles from './confirmation-dialog.module.css';

type ConfirmationDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
};

export const ConfirmationDialog = ({
    isOpen,
    onOpenChange,
    title,
    description,
    onConfirm,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
}: ConfirmationDialogProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent className={styles.dialogContent}>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
