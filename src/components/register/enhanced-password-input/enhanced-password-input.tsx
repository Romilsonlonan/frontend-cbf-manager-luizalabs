import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import styles from './enhanced-password-input.module.css';

import { Input } from '@/components/ui/input'; // Assuming Input is a shadcn/ui component
import { Button } from '@/components/ui/button'; // Assuming Button is a shadcn/ui component

interface EnhancedPasswordInputProps {
    id: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    type?: string; // Add type prop
    inputClassName?: string; // Add className prop for the input
    buttonClassName?: string; // Add className prop for the button
    iconClassName?: string; // Add className prop for the icon
    onToggleVisibility: () => void; // Add onToggleVisibility prop
    mostrarSenha: boolean; // Add mostrarSenha prop
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
