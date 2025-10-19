
'use client';

import { useState, useEffect, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  children: ReactNode;
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
  children,
  initialValues = {},
  readOnlyFields = [],
}: EntityFormDialogProps) {
  const [formData, setFormData] = useState<Record<string, string>>(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {formFields.map((field) => (
              <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="col-span-3"
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
