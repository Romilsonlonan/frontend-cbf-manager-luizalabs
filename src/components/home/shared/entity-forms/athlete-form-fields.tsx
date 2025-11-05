import React from 'react';
import { FormField } from '../forms/form-field';
import { FormSection } from '../forms/form-section';

interface AthleteFormFieldsProps {
    data: Record<string, string>;
    onChange: (id: string, value: string) => void;
    readOnlyFields?: string[];
}

export const AthleteFormFields = ({ data, onChange, readOnlyFields = [] }: AthleteFormFieldsProps) => {
    return (
        <FormSection title="Dados do Atleta" description="Informações básicas e de contato do atleta.">
            <FormField
                label="Nome Completo"
                type="text"
                placeholder="Nome completo do atleta"
                value={data.name || ''}
                onChange={(value) => onChange('name', value)}
                readOnly={readOnlyFields.includes('name')}
                disabled={readOnlyFields.includes('name')}
            />
            <FormField
                label="Posição"
                type="text"
                placeholder="Posição principal do atleta"
                value={data.position || ''}
                onChange={(value) => onChange('position', value)}
                readOnly={readOnlyFields.includes('position')}
                disabled={readOnlyFields.includes('position')}
            />
            <FormField
                label="Idade"
                type="number"
                placeholder="Idade do atleta"
                value={data.age || ''}
                onChange={(value) => onChange('age', value)}
                readOnly={readOnlyFields.includes('age')}
                disabled={readOnlyFields.includes('age')}
            />
            <FormField
                label="Nacionalidade"
                type="text"
                placeholder="Nacionalidade do atleta"
                value={data.nationality || ''}
                onChange={(value) => onChange('nationality', value)}
                readOnly={readOnlyFields.includes('nationality')}
                disabled={readOnlyFields.includes('nationality')}
            />
            <FormField
                label="Altura (m)"
                type="number"
                placeholder="Altura em metros"
                value={data.height || ''}
                onChange={(value) => onChange('height', value)}
                readOnly={readOnlyFields.includes('height')}
                disabled={readOnlyFields.includes('height')}
            />
            <FormField
                label="Peso (kg)"
                type="number"
                placeholder="Peso em quilogramas"
                value={data.weight || ''}
                onChange={(value) => onChange('weight', value)}
                readOnly={readOnlyFields.includes('weight')}
                disabled={readOnlyFields.includes('weight')}
            />
            <FormField
                label="Número da Camisa"
                type="number"
                placeholder="Número da camisa"
                value={data.jersey_number || ''}
                onChange={(value) => onChange('jersey_number', value)}
                readOnly={readOnlyFields.includes('jersey_number')}
                disabled={readOnlyFields.includes('jersey_number')}
            />
            <FormField
                label="Tipo de Jogador"
                type="text"
                placeholder="Ex: goleiro, atacante, etc."
                value={data.player_type || ''}
                onChange={(value) => onChange('player_type', value)}
                readOnly={readOnlyFields.includes('player_type')}
                disabled={readOnlyFields.includes('player_type')}
            />
            <FormField
                label="Gols"
                type="number"
                placeholder="Número de gols"
                value={data.goals || ''}
                onChange={(value) => onChange('goals', value)}
                readOnly={readOnlyFields.includes('goals')}
                disabled={readOnlyFields.includes('goals')}
            />
            <FormField
                label="Assistências"
                type="number"
                placeholder="Número de assistências"
                value={data.assists || ''}
                onChange={(value) => onChange('assists', value)}
                readOnly={readOnlyFields.includes('assists')}
                disabled={readOnlyFields.includes('assists')}
            />
            <FormField
                label="Defesas"
                type="number"
                placeholder="Número de defesas (para goleiros)"
                value={data.defenses || ''}
                onChange={(value) => onChange('defenses', value)}
                readOnly={readOnlyFields.includes('defenses')}
                disabled={readOnlyFields.includes('defenses')}
            />
            <FormField
                label="Gols Sofridos"
                type="number"
                placeholder="Número de gols sofridos (para goleiros)"
                value={data.goals_conceded || ''}
                onChange={(value) => onChange('goals_conceded', value)}
                readOnly={readOnlyFields.includes('goals_conceded')}
                disabled={readOnlyFields.includes('goals_conceded')}
            />
            <FormField
                label="Cartões Amarelos"
                type="number"
                placeholder="Número de cartões amarelos"
                value={data.yellow_cards || ''}
                onChange={(value) => onChange('yellow_cards', value)}
                readOnly={readOnlyFields.includes('yellow_cards')}
                disabled={readOnlyFields.includes('yellow_cards')}
            />
            <FormField
                label="Cartões Vermelhos"
                type="number"
                placeholder="Número de cartões vermelhos"
                value={data.red_cards || ''}
                onChange={(value) => onChange('red_cards', value)}
                readOnly={readOnlyFields.includes('red_cards')}
                disabled={readOnlyFields.includes('red_cards')}
            />
            <FormField
                label="Jogos"
                type="number"
                placeholder="Número de jogos disputados"
                value={data.games || ''}
                onChange={(value) => onChange('games', value)}
                readOnly={readOnlyFields.includes('games')}
                disabled={readOnlyFields.includes('games')}
            />
        </FormSection>
    );
};
