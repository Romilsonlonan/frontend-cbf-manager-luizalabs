import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import styles from './add-club-modal-input.module.css';

interface AddClubModalInputField {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    maxLength?: number;
    min?: string;
}

interface AddClubModalInputProps {
    field: AddClubModalInputField;
    value?: string;
    onChange?: (id: string, value: string) => void;
    customInput?: React.ReactNode;
}

export function AddClubModalInput({ field, value, onChange, customInput }: AddClubModalInputProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(field.id, e.target.value);
        }
    };

    return (
        <div className={styles.formField}>
            <Label htmlFor={field.id}>{field.label}</Label>
            {customInput ? (
                customInput
            ) : (
                <Input
                    id={field.id}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={handleInputChange}
                    required={field.required}
                    maxLength={field.maxLength}
                    min={field.min}
                />
            )}
        </div>
    );
}
