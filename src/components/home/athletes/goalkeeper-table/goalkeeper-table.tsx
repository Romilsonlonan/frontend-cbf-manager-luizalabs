import * as React from "react";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    User, // Camisa
    Compass, // Posição
    Ruler, // Altura
    Weight, // Peso
    Flag, // Nacionalidade
    Shirt, // Jogos
    ArrowRightLeft, // Substituições
    Goal, // Gols e Gols Sofridos
    Handshake, // Assistências
    ShieldAlert, // Defesas
    Gavel, // Faltas Cometidas
    Scale, // Faltas Sofridas
    CreditCard, // Cartões Amarelos
    SquareSlash, // Cartões Vermelhos
} from "lucide-react";
import { GoalkeeperResponse } from "@/lib/types";
import { PlayerStatsColumn } from "@/lib/definitions"; // Import PlayerStatsColumn
import styles from "./goalkeeper-table.module.css";

interface GoalkeeperTableProps {
    goalkeepers: GoalkeeperResponse[];
    columns: PlayerStatsColumn[]; // Add columns prop
}

export function GoalkeeperTable({ goalkeepers, columns }: GoalkeeperTableProps) {
    const getCellValue = (player: GoalkeeperResponse, columnKey: string) => {
        switch (columnKey) {
            case 'height':
                return `${player.height ?? 0}m`;
            case 'weight':
                return `${player.weight ?? 0}kg`;
            case 'nationality':
                return player.nationality ?? 'N/A';
            case 'games':
                return player.games ?? 0;
            case 'substitutions':
                return player.substitutions ?? 0;
            case 'saves':
                return player.saves ?? 0;
            case 'goals_conceded':
                return player.goals_conceded ?? 0;
            case 'assists':
                return player.assists ?? 0;
            case 'fouls_committed':
                return player.fouls_committed ?? 0;
            case 'fouls_suffered':
                return player.fouls_suffered ?? 0;
            case 'yellow_cards':
                return player.yellow_cards ?? 0;
            case 'red_cards':
                return player.red_cards ?? 0;
            case 'club_id':
                return player.club?.name ?? ''; // Display club name or empty string
            default:
                const value = player[columnKey as keyof GoalkeeperResponse];
                return typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
        }
    };

    return (
        <div className={styles.tableContainer}>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.key} className={styles.tableHeadCell}>
                                {column.name}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {goalkeepers.map((player) => (
                        <TableRow key={player.id}>
                            {columns.map((column) => (
                                <TableCell key={`${player.id}-${column.key}`} className={styles.tableBodyCell}>
                                    {getCellValue(player, column.key)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
