"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import styles from "./add-athlete-modal-input.module.css";

interface FormField {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
    options?: { value: string; label: string }[];
}

interface AddAthleteModalInputProps {
    field: FormField;
    value: string;
    onChange: (id: string, value: string) => void;
}

export function AddAthleteModalInput({ field, value, onChange }: AddAthleteModalInputProps) {
    return (
        <div className={styles.formField}>
            <Label htmlFor={field.id}>{field.label}</Label>
            {field.type === 'select' ? (
                <Select onValueChange={(val) => onChange(field.id, val)} value={value}>
                    <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ) : (
                <Input
                    id={field.id}
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => onChange(field.id, e.target.value)}
                />
            )}
        </div>
    );
}
