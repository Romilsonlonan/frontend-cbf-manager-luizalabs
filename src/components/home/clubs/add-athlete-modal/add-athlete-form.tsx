"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddAthleteModalInput } from "./add-athlete-modal-input";
import styles from "./add-athlete-form.module.css";

interface FormField {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
    options?: { value: string; label: string }[];
}

interface AddAthleteFormProps {
    formFields: FormField[];
    onSubmit: (formData: Record<string, string>) => void;
    submitButtonText: string;
}

export function AddAthleteForm({ formFields, onSubmit, submitButtonText }: AddAthleteFormProps) {
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleChange = (id: string, value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <ScrollArea className="h-[calc(90vh-150px)] p-4">
            <form onSubmit={handleSubmit} className={styles.formGrid}>
                {formFields.map((field) => (
                    <AddAthleteModalInput
                        key={field.id}
                        field={field}
                        value={formData[field.id] || ''}
                        onChange={handleChange}
                    />
                ))}
                <div className={styles.submitButtonContainer}>
                    <Button type="submit">{submitButtonText}</Button>
                </div>
            </form>
        </ScrollArea>
    );
}
