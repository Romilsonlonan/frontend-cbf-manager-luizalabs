import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import styles from './password-input.module.css';

interface PasswordInputProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    placeholder?: string;
}

export function PasswordInput({
    id,
    label,
    value,
    onChange,
    required = false,
    placeholder,
}: PasswordInputProps) {
    return (
        <div className={styles.inputGroup}>
            <Label htmlFor={id} className={styles.label}>{label}</Label>
            <Input
                id={id}
                name={id}
                type="password"
                autoComplete={id === 'password' ? 'current-password' : 'new-password'}
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.input}
            />
        </div>
    );
}
