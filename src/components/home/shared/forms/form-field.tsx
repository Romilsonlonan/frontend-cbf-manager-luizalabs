import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import styles from './form-field.module.css';

type FormFieldProps = {
    label: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    readOnly?: boolean;
    disabled?: boolean;
};

export const FormField = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    readOnly = false,
    disabled = false,
}: FormFieldProps) => {
    return (
        <div className={styles.formFieldContainer}>
            <Label className={styles.label}>{label}</Label>
            <Input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                readOnly={readOnly}
                disabled={disabled}
                className={styles.input}
            />
        </div>
    );
};
