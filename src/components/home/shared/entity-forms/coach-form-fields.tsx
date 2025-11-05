import React from 'react';
import { FormField } from '../forms/form-field';
import { FormSection } from '../forms/form-section';

interface CoachFormFieldsProps {
    data: Record<string, string>;
    onChange: (id: string, value: string) => void;
    readOnlyFields?: string[];
}

export const CoachFormFields = ({ data, onChange, readOnlyFields = [] }: CoachFormFieldsProps) => {
    return (
        <FormSection title="Dados do Treinador" description="Informações básicas e de contato do treinador.">
            <FormField
                label="Nome Completo"
                type="text"
                placeholder="Nome completo do treinador"
                value={data.name || ''}
                onChange={(value) => onChange('name', value)}
                readOnly={readOnlyFields.includes('name')}
                disabled={readOnlyFields.includes('name')}
            />
            <FormField
                label="Nacionalidade"
                type="text"
                placeholder="Nacionalidade do treinador"
                value={data.nationality || ''}
                onChange={(value) => onChange('nationality', value)}
                readOnly={readOnlyFields.includes('nationality')}
                disabled={readOnlyFields.includes('nationality')}
            />
            <FormField
                label="Idade"
                type="number"
                placeholder="Idade do treinador"
                value={data.age || ''}
                onChange={(value) => onChange('age', value)}
                readOnly={readOnlyFields.includes('age')}
                disabled={readOnlyFields.includes('age')}
            />
            <FormField
                label="Licença"
                type="text"
                placeholder="Tipo de licença do treinador"
                value={data.license || ''}
                onChange={(value) => onChange('license', value)}
                readOnly={readOnlyFields.includes('license')}
                disabled={readOnlyFields.includes('license')}
            />
            <FormField
                label="Anos de Experiência"
                type="number"
                placeholder="Anos de experiência como treinador"
                value={data.experience_years || ''}
                onChange={(value) => onChange('experience_years', value)}
                readOnly={readOnlyFields.includes('experience_years')}
                disabled={readOnlyFields.includes('experience_years')}
            />
        </FormSection>
    );
};
