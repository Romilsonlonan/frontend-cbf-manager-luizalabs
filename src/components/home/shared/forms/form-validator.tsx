import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';

type ValidationRule = {
    field: string;
    rule: (value: any, formData: Record<string, any>) => string | null;
};

type FormValidatorContextType = {
    errors: Record<string, string | null>;
    validateField: (field: string, value: any) => void;
    validateForm: () => boolean;
};

const FormValidatorContext = createContext<FormValidatorContextType | undefined>(undefined);

export const useFormValidator = () => {
    const context = useContext(FormValidatorContext);
    if (!context) {
        throw new Error('useFormValidator must be used within a FormValidatorProvider');
    }
    return context;
};

interface FormValidatorProviderProps {
    rules: ValidationRule[];
    formData: Record<string, any>;
    children: ReactNode;
}

export const FormValidatorProvider = ({ rules, formData, children }: FormValidatorProviderProps) => {
    const [errors, setErrors] = useState<Record<string, string | null>>({});

    useEffect(() => {
        // Re-validate form when formData changes
        validateForm();
    }, [formData]);

    const validateField = (field: string, value: any) => {
        const fieldRules = rules.filter((rule) => rule.field === field);
        let error: string | null = null;
        for (const rule of fieldRules) {
            error = rule.rule(value, formData);
            if (error) break;
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors: Record<string, string | null> = {};

        for (const fieldName in formData) {
            const fieldRules = rules.filter((rule) => rule.field === fieldName);
            let error: string | null = null;
            for (const rule of fieldRules) {
                error = rule.rule(formData[fieldName], formData);
                if (error) break;
            }
            newErrors[fieldName] = error;
            if (error) isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    return (
        <FormValidatorContext.Provider value={{ errors, validateField, validateForm }}>
            {children}
        </FormValidatorContext.Provider>
    );
};
