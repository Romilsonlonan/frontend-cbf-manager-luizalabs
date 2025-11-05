import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import styles from './alert-dialog.module.css';

type AlertDialogType = 'info' | 'success' | 'warning' | 'error';

type AlertDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    type: AlertDialogType;
    title: string;
    message: string;
    confirmText?: string;
};

const IconMap: Record<AlertDialogType, React.ComponentType<any>> = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
};

const TitleClassMap: Record<AlertDialogType, string> = {
    info: styles.infoTitle,
    success: styles.successTitle,
    warning: styles.warningTitle,
    error: styles.errorTitle,
};

export const CustomAlertDialog = ({
    isOpen,
    onOpenChange,
    type,
    title,
    message,
    confirmText = 'Ok',
}: AlertDialogProps) => {
    const IconComponent = IconMap[type];
    const titleClassName = TitleClassMap[type];

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent className={styles.dialogContent}>
                <AlertDialogHeader>
                    <AlertDialogTitle className={`${styles.dialogTitle} ${titleClassName}`}>
                        {IconComponent && <IconComponent className={styles.icon} />}
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>{message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => onOpenChange(false)}>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
