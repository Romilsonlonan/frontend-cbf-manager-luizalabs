import React from 'react';
import { Input } from '@/components/ui/input';
import { LucideIcon } from 'lucide-react';
import styles from './icon-input.module.css';

interface IconInputProps {
    id: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    icon: LucideIcon;
    iconClassName?: string;
    inputClassName?: string;
}

export function IconInput({
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = false,
    disabled = false,
    icon: Icon,
    iconClassName,
    inputClassName,
}: IconInputProps) {
    return (
        <div className={styles.inputWrapper}>
            <Icon className={`${styles.icon} ${iconClassName || ''}`} />
            <Input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={`${styles.input} ${inputClassName || ''}`}
            />
        </div>
    );
}
