'use client';

import { useState, useEffect, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import styles from './entity-form-dialog.module.css';

type FormField = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
};

type EntityFormDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  dialogTitle: string;
  dialogDescription: string;
  formFields: FormField[];
  onSubmit: (formData: Record<string, string>) => void;
  submitButtonText: string;
  initialValues?: Record<string, string>;
  readOnlyFields?: string[];
};

export function EntityFormDialog({
  isOpen,
  onOpenChange,
  dialogTitle,
  dialogDescription,
  formFields,
  onSubmit,
  submitButtonText,
  initialValues = {},
  readOnlyFields = [],
}: EntityFormDialogProps) {
  const [formData, setFormData] = useState<Record<string, string>>(initialValues);

  // Usar JSON.stringify para comparar objetos de forma profunda
  useEffect(() => {
    if (isOpen) {
      const initialValuesStr = JSON.stringify(initialValues);
      const currentFormDataStr = JSON.stringify(formData);

      if (initialValuesStr !== currentFormDataStr) {
        setFormData(initialValues);
      }
    }
  }, [isOpen, JSON.stringify(initialValues)]);

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={styles.dialogContent}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className={styles.formGrid}>
            {formFields.map((field) => (
              <div key={field.id} className={styles.formField}>
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className={styles.inputField}
                  readOnly={readOnlyFields.includes(field.id)}
                  disabled={readOnlyFields.includes(field.id)}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">{submitButtonText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
