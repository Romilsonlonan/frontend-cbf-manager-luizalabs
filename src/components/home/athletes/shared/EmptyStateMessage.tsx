import React from 'react';
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { AlertCircle, Goal, User } from "lucide-react";

interface EmptyStateMessageProps {
    type: 'all' | 'goalkeepers' | 'fieldPlayers';
}

const EmptyStateMessage: React.FC<EmptyStateMessageProps> = ({ type }) => {
    let icon;
    let message;

    switch (type) {
        case 'all':
            icon = <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />;
            message = "Nenhum atleta encontrado. Use o botão de atualização para buscar os dados mais recentes.";
            break;
        case 'goalkeepers':
            icon = <Goal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />;
            message = "Nenhum goleiro encontrado.";
            break;
        case 'fieldPlayers':
            icon = <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />;
            message = "Nenhum jogador de campo encontrado.";
            break;
        default:
            icon = <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />;
            message = "Nenhum dado encontrado.";
    }

    return (
        <Card>
            <CardContent className="p-8 text-center">
                {icon}
                <CardDescription>{message}</CardDescription>
            </CardContent>
        </Card>
    );
};

export default EmptyStateMessage;
