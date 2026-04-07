import React from 'react';
import { Button } from '@/components/ui/button';
import styles from './submit-button.module.css';

interface SubmitButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export function SubmitButton({ children, disabled = false, className }: SubmitButtonProps) {
    return (
        <Button 
            type="submit" 
            className={`${styles.submitButton} ${className || ''}`} 
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
