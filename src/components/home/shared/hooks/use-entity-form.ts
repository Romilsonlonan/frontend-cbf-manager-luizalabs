import { useState, useCallback } from 'react';

export const useEntityForm = <T extends Record<string, any>>(
    initialData: T,
    onSubmit: (data: T) => Promise<void> | void,
) => {
    const [formData, setFormData] = useState<T>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const handleChange = useCallback((id: keyof T, value: T[keyof T]) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    }, []);

    const handleSubmit = useCallback(async (e?: React.FormEvent) => {
        e?.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);

        try {
            await onSubmit(formData);
            setSubmitSuccess('Operação realizada com sucesso!');
            // Optionally reset form or close dialog here
        } catch (error: any) {
            setSubmitError(error.message || 'Ocorreu um erro ao processar sua solicitação.');
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, onSubmit]);

    const resetForm = useCallback(() => {
        setFormData(initialData);
        setSubmitError(null);
        setSubmitSuccess(null);
    }, [initialData]);

    return {
        formData,
        handleChange,
        handleSubmit,
        isSubmitting,
        submitError,
        submitSuccess,
        resetForm,
        setFormData, // Allow external updates if needed
    };
};
