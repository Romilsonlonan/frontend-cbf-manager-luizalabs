import * as React from "react";
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
    Goal, // Gols
    Handshake, // Assistências
    Crosshair, // Tentativas de Cruzamento
    Target, // Chutes a Gol
    Gavel, // Faltas Cometidas
    Scale, // Faltas Sofridas
    CreditCard, // Cartões Amarelos
    SquareSlash, // Cartões Vermelhos
    ShieldAlert, // Defesas (para consistência, embora não seja o foco principal)
} from "lucide-react";
import { FieldPlayerResponse, Position } from "@/lib/types";
import styles from "./field-player-table.module.css";

interface Player extends FieldPlayerResponse {
    player_type: 'field_player'; // Match FieldPlayerResponse
    updated_at?: string; // Made optional
}

interface FieldPlayerTableProps {
    fieldPlayers: Player[];
}

export function FieldPlayerTable({ fieldPlayers }: FieldPlayerTableProps) {
    return (
        <div className={styles.tableContainer}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className={styles.tableHeadCell}>Nome</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Compass className={styles.icon} />POS</TableHead>
                        <TableHead className={styles.tableHeadCell}>Idade</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Ruler className={styles.icon} />Alt</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Weight className={styles.icon} />P</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Flag className={styles.icon} />NAC</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Shirt className={styles.icon} />J</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><ArrowRightLeft className={styles.icon} />SUB</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Goal className={styles.icon} />G</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Handshake className={styles.icon} />A</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Crosshair className={styles.icon} />TC</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Target className={styles.icon} />CG</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Gavel className={styles.icon} />FC</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Scale className={styles.icon} />FS</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><CreditCard className={styles.icon} />CA</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><SquareSlash className={styles.icon} />CV</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fieldPlayers.map((player) => (
                        <TableRow key={player.id}>
                            <TableCell className={styles.tableBodyCell}>{player.name}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.position}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.age}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.height ?? 0}m</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.weight ?? 0}kg</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.nationality ?? 'N/A'}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.games ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.substitutions ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.goals ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.assists ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.total_shots ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.shots_on_goal ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.fouls_committed ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.fouls_suffered ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.yellow_cards ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.red_cards ?? 0}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}