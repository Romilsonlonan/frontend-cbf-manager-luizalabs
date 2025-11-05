import React from 'react';
import { Button } from '@/components/ui/button';
import styles from './form-actions.module.css';

type FormActionsProps = {
    onCancel: () => void;
    onSubmit: () => void;
    submitText?: string;
    cancelText?: string;
    isSubmitting?: boolean;
};

export const FormActions = ({
    onCancel,
    onSubmit,
    submitText = 'Salvar',
    cancelText = 'Cancelar',
    isSubmitting = false,
}: FormActionsProps) => {
    return (
        <div className={styles.formActionsContainer}>
            <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
                {cancelText}
            </Button>
            <Button type="submit" onClick={onSubmit} disabled={isSubmitting}>
                {submitText}
            </Button>
        </div>
    );
};
