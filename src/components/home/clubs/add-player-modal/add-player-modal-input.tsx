import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import styles from './add-player-modal-input.module.css';

interface AddPlayerModalInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
    min?: string;
    max?: string;
    step?: string;
}

export function AddPlayerModalInput({
    id,
    label,
    type = 'text',
    value,
    onChange,
    required = false,
    placeholder,
    min,
    max,
    step,
}: AddPlayerModalInputProps) {
    return (
        <div className={styles.formField}>
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
            />
        </div>
    );
}
