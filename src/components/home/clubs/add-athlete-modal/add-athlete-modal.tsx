"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { AddAthleteForm } from "./add-athlete-form";
import { AddAthleteModalButton } from "./add-athlete-modal-button";
import { ClubSimpleResponse, Position } from "@/lib/types";
import styles from "./add-athlete-modal.module.css";

interface AddAthleteModalProps {
    clubs: ClubSimpleResponse[];
    onAddAthlete: (formData: Record<string, string>) => void;
}

export function AddAthleteModal({ clubs = [], onAddAthlete }: AddAthleteModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleFormSubmit = (formData: Record<string, string>) => {
        onAddAthlete(formData);
        setIsOpen(false);
    };

    const athleteFormFields = [
        { id: 'name', label: 'Nome', placeholder: 'Nome completo do atleta' },
        {
            id: 'position', label: 'Posição', type: 'select', options: [
                { value: 'A', label: 'Atacante' },
                { value: 'D', label: 'Defensor' },
                { value: 'M', label: 'Meio-campo' },
                { value: 'G', label: 'Goleiro' },
            ], placeholder: 'Selecione a posição'
        },
        {
            id: 'club_id',
            label: 'Clube',
            type: 'select',
            options: (clubs ?? []).map(club => ({ value: club.id.toString(), label: club.name })),
            placeholder: 'Selecione o clube',
        },
        { id: 'age', label: 'Idade', type: 'number', placeholder: 'Ex: 25' },
        { id: 'goals', label: 'Gols', type: 'number', placeholder: 'Ex: 10' },
        { id: 'yellow_cards', label: 'Cartões Amarelos', type: 'number', placeholder: 'Ex: 5' },
        { id: 'red_cards', label: 'Cartões Vermelhos', type: 'number', placeholder: 'Ex: 1' },
        { id: 'jersey_number', label: 'Número da Camisa', type: 'number', placeholder: 'Ex: 10' },
        { id: 'height', label: 'Altura (cm)', type: 'number', placeholder: 'Ex: 180' },
        { id: 'weight', label: 'Peso (kg)', type: 'number', placeholder: 'Ex: 75' },
        { id: 'nationality', label: 'Nacionalidade', placeholder: 'Ex: Brasileira' },
        { id: 'games', label: 'Jogos', type: 'number', placeholder: 'Ex: 30' },
        { id: 'substitute_appearances', label: 'Aparições como Substituto', type: 'number', placeholder: 'Ex: 5' },
        { id: 'assists', label: 'Assistências', type: 'number', placeholder: 'Ex: 7' },
        { id: 'shots', label: 'Chutes', type: 'number', placeholder: 'Ex: 50' },
        { id: 'shots_on_goal', label: 'Chutes no Gol', type: 'number', placeholder: 'Ex: 25' },
        { id: 'fouls_committed', label: 'Faltas Cometidas', type: 'number', placeholder: 'Ex: 15' },
        { id: 'fouls_suffered', label: 'Faltas Sofridas', type: 'number', placeholder: 'Ex: 20' },
        { id: 'defenses', label: 'Defesas', type: 'number', placeholder: 'Ex: 100' },
        { id: 'goals_conceded', label: 'Gols Sofridos', type: 'number', placeholder: 'Ex: 30' },
        {
            id: 'player_type', label: 'Tipo de Jogador', type: 'select', options: [
                { value: 'goleiro', label: 'Goleiro' },
                { value: 'jogador', label: 'Jogador de Campo' },
            ], placeholder: 'Selecione o tipo de jogador'
        },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <AddAthleteModalButton onClick={() => setIsOpen(true)} />
            </DialogTrigger>
            <DialogContent className={styles.dialogContent}>
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Atleta</DialogTitle>
                    <DialogDescription>
                        Preencha as informações do atleta para adicioná-lo ao sistema.
                    </DialogDescription>
                </DialogHeader>
                <AddAthleteForm
                    formFields={athleteFormFields}
                    onSubmit={handleFormSubmit}
                    submitButtonText="Salvar Atleta"
                />
            </DialogContent>
        </Dialog>
    );
}
