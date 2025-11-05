import React from 'react';
import { FormField } from '../forms/form-field';
import { FormSection } from '../forms/form-section';

interface ClubFormFieldsProps {
    data: Record<string, string>;
    onChange: (id: string, value: string) => void;
    readOnlyFields?: string[];
}

export const ClubFormFields = ({ data, onChange, readOnlyFields = [] }: ClubFormFieldsProps) => {
    return (
        <FormSection title="Dados do Clube" description="Informações básicas e de contato do clube.">
            <FormField
                label="Nome do Clube"
                type="text"
                placeholder="Nome completo do clube"
                value={data.name || ''}
                onChange={(value) => onChange('name', value)}
                readOnly={readOnlyFields.includes('name')}
                disabled={readOnlyFields.includes('name')}
            />
            <FormField
                label="Abreviação"
                type="text"
                placeholder="Abreviação do clube (ex: FLA, COR)"
                value={data.acronym || ''}
                onChange={(value) => onChange('acronym', value)}
                readOnly={readOnlyFields.includes('acronym')}
                disabled={readOnlyFields.includes('acronym')}
            />
            <FormField
                label="País"
                type="text"
                placeholder="País de origem do clube"
                value={data.country || ''}
                onChange={(value) => onChange('country', value)}
                readOnly={readOnlyFields.includes('country')}
                disabled={readOnlyFields.includes('country')}
            />
            <FormField
                label="Estado"
                type="text"
                placeholder="Estado de origem do clube"
                value={data.state || ''}
                onChange={(value) => onChange('state', value)}
                readOnly={readOnlyFields.includes('state')}
                disabled={readOnlyFields.includes('state')}
            />
            <FormField
                label="Cidade"
                type="text"
                placeholder="Cidade de origem do clube"
                value={data.city || ''}
                onChange={(value) => onChange('city', value)}
                readOnly={readOnlyFields.includes('city')}
                disabled={readOnlyFields.includes('city')}
            />
            <FormField
                label="Ano de Fundação"
                type="number"
                placeholder="Ano de fundação do clube"
                value={data.foundation_year || ''}
                onChange={(value) => onChange('foundation_year', value)}
                readOnly={readOnlyFields.includes('foundation_year')}
                disabled={readOnlyFields.includes('foundation_year')}
            />
            <FormField
                label="URL do Escudo"
                type="text"
                placeholder="URL da imagem do escudo do clube"
                value={data.shield_url || ''}
                onChange={(value) => onChange('shield_url', value)}
                readOnly={readOnlyFields.includes('shield_url')}
                disabled={readOnlyFields.includes('shield_url')}
            />
        </FormSection>
    );
};
