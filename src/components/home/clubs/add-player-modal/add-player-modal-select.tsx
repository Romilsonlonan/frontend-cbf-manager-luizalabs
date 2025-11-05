import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import styles from './add-player-modal-select.module.css';

interface SelectOption {
    value: string;
    label: string;
}

interface AddPlayerModalSelectProps {
    id: string;
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    required?: boolean;
}

export function AddPlayerModalSelect({
    id,
    label,
    value,
    onValueChange,
    options,
    placeholder,
    required = false,
}: AddPlayerModalSelectProps) {
    return (
        <div className={styles.formField}>
            <Label htmlFor={id}>{label}</Label>
            <Select
                value={value}
                onValueChange={onValueChange}
                required={required}
            >
                <SelectTrigger id={id}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
