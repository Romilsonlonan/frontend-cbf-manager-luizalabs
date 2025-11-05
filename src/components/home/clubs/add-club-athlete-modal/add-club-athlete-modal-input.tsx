import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import styles from './add-club-athlete-modal-input.module.css'

interface FormField {
    id: string
    label: string
    placeholder: string
    type?: string
    options?: { value: string; label: string }[]
    required?: boolean
}

interface AddClubAthleteModalInputProps {
    field: FormField
    value: string
    onChange: (id: string, value: string) => void
    options?: string[] | { id: number; name: string }[]
}

export function AddClubAthleteModalInput({
    field,
    value,
    onChange,
    options,
}: AddClubAthleteModalInputProps) {
    return (
        <div className={styles.formField}>
            <Label htmlFor={field.id}>{field.label}</Label>
            {field.type === 'select' ? (
                <Select
                    value={value}
                    onValueChange={(val) => onChange(field.id, val)}
                    required={field.required}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {options?.map((option) => {
                            if (typeof option === 'string') {
                                return (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                )
                            } else {
                                return (
                                    <SelectItem key={option.id} value={option.name}>
                                        {option.name}
                                    </SelectItem>
                                )
                            }
                        })}
                    </SelectContent>
                </Select>
            ) : (
                <Input
                    id={field.id}
                    type={field.type || 'text'}
                    value={value}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                />
            )}
        </div>
    )
}
