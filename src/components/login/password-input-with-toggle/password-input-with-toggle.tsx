import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import styles from './password-input-with-toggle.module.css';

interface PasswordInputWithToggleProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
    showPassword: boolean;
    onToggleVisibility: () => void;
}

export function PasswordInputWithToggle({
    id,
    value,
    onChange,
    required = false,
    disabled = false,
    placeholder,
    showPassword,
    onToggleVisibility,
}: PasswordInputWithToggleProps) {
    return (
        <div className={styles.inputWrapper}>
            <LockIcon className={styles.icon} />
            <Input
                id={id}
                name={id}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className={styles.input}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className={styles.toggleButton}
                onClick={onToggleVisibility}
                disabled={disabled}
            >
                {showPassword ? (
                    <EyeOffIcon className={styles.toggleIcon} />
                ) : (
                    <EyeIcon className={styles.toggleIcon} />
                )}
            </Button>
        </div>
    );
}
