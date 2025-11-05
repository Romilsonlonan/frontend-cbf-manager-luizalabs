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
    Goal, // Gols e Gols Sofridos
    Handshake, // Assistências
    ShieldAlert, // Defesas
    Gavel, // Faltas Cometidas
    Scale, // Faltas Sofridas
    CreditCard, // Cartões Amarelos
    SquareSlash, // Cartões Vermelhos
} from "lucide-react";
import { PlayerResponse, Position } from "@/lib/types";
import styles from "./goalkeeper-table.module.css";

interface Player extends PlayerResponse {
    player_type?: string; // Made optional
    updated_at?: string; // Made optional
}

interface GoalkeeperTableProps {
    goalkeepers: Player[];
}

export function GoalkeeperTable({ goalkeepers }: GoalkeeperTableProps) {
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
                        <TableHead className={styles.tableHeadCellWithIcon}><User className={styles.icon} />C</TableHead>{/* Camisa */}
                        <TableHead className={styles.tableHeadCellWithIcon}><Goal className={styles.icon} />G</TableHead>{/* Gols */}
                        <TableHead className={styles.tableHeadCellWithIcon}><ShieldAlert className={styles.icon} />D</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Goal className={styles.icon} />GS</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Handshake className={styles.icon} />A</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Gavel className={styles.icon} />FC</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><Scale className={styles.icon} />FS</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><CreditCard className={styles.icon} />CA</TableHead>
                        <TableHead className={styles.tableHeadCellWithIcon}><SquareSlash className={styles.icon} />CV</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {goalkeepers.map((player) => (
                        <TableRow key={player.id}>
                            <TableCell className={styles.tableBodyCell}>{player.name}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.position}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.age}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.height ?? 0}m</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.weight ?? 0}kg</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.nationality ?? 'N/A'}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.games ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.substitute_appearances ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.jersey_number ?? 'N/A'}</TableCell>{/* Camisa */}
                            <TableCell className={styles.tableBodyCell}>{player.goals ?? 0}</TableCell>{/* Gols */}
                            <TableCell className={styles.tableBodyCell}>{player.defenses ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.goals_conceded ?? 0}</TableCell>
                            <TableCell className={styles.tableBodyCell}>{player.assists ?? 0}</TableCell>
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
