import { useState, useEffect, useCallback } from 'react';

type ValidationRule = {
    field: string;
    rule: (value: any, formData: Record<string, any>) => string | null;
};

export const useFormValidation = (formData: Record<string, any>, rules: ValidationRule[]) => {
    const [errors, setErrors] = useState<Record<string, string | null>>({});

    const validateField = useCallback((field: string, value: any) => {
        const fieldRules = rules.filter((rule) => rule.field === field);
        let error: string | null = null;
        for (const rule of fieldRules) {
            error = rule.rule(value, formData);
            if (error) break;
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
        return error;
    }, [formData, rules]);

    const validateForm = useCallback(() => {
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
    }, [formData, rules]);

    useEffect(() => {
        validateForm();
    }, [formData, validateForm]);

    return { errors, validateField, validateForm };
};
