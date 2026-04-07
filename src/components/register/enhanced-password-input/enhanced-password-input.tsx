import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import styles from './enhanced-password-input.module.css';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EnhancedPasswordInputProps {
    id: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    inputClassName?: string;
    buttonClassName?: string;
    iconClassName?: string;
    onToggleVisibility: () => void;
    mostrarSenha: boolean;
}

const EnhancedPasswordInput: React.FC<EnhancedPasswordInputProps> = ({
    id,
    name,
    placeholder,
    required,
    type,
    inputClassName,
    buttonClassName,
    iconClassName,
    onToggleVisibility,
    mostrarSenha
}) => {
    return (
        <div className={styles.inputSenhaContainer}>
            <LockIcon className={`${styles.iconeInput} ${iconClassName || ''}`} />
            <Input
                id={id}
                name={name}
                type={mostrarSenha ? 'text' : 'password'}
                placeholder={placeholder}
                required={required}
                className={`${styles.inputSenha} ${inputClassName || ''}`}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`${styles.botaoMostrarSenha} ${buttonClassName || ''}`}
                onClick={onToggleVisibility}
            >
                {mostrarSenha ? (
                    <EyeIcon className={`${styles.iconeOlho} ${iconClassName || ''}`} />
                ) : (
                    <EyeOffIcon className={`${styles.iconeOlho} ${iconClassName || ''}`} />
                )}
            </Button>
        </div>
    );
};

export default EnhancedPasswordInput;
