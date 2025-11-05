'use client';

import React from 'react';
import styles from './PlayerTable.module.css';
import { PlayerResponse } from '@/lib/types'; // Import PlayerResponse type

interface PlayerTableProps {
    players: PlayerResponse[];
    isLoading: boolean;
    error: string | null;
}

export function PlayerTable({ players, isLoading, error }: PlayerTableProps) {
    if (isLoading) {
        return (
            <div className={styles.playerTableContainer}>
                <p className={styles.playerTablePlaceholder}>Carregando jogadores...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.playerTableContainer}>
                <h3 className={styles.playerTableTitle}>Erro ao carregar jogadores</h3>
                <p className={styles.playerTablePlaceholder}>
                    Ocorreu um erro: {error}. Por favor, verifique a conexão e a autenticação da API.
                </p>
            </div>
        );
    }

    if (!players || players.length === 0) {
        return (
            <div className={styles.playerTableContainer}>
                <h3 className={styles.playerTableTitle}>Tabela de Jogadores</h3>
                <p className={styles.playerTablePlaceholder}>Nenhum jogador encontrado ou disponível.</p>
            </div>
        );
    }

    return (
        <div className={styles.playerTableContainer}>
            <h3 className={styles.playerTableTitle}>Tabela de Jogadores</h3>
            <div className={styles.tableWrapper}>
                <table className={styles.playerTable}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Pos</th>
                            <th>Idade</th>
                            <th>Alt</th>
                            <th>P</th>
                            <th>NAC</th>
                            <th>J</th>
                            <th>SUB</th>
                            <th>G</th>
                            <th>A</th>
                            <th>TC</th>
                            <th>CG</th>
                            <th>FC</th>
                            <th>FS</th>
                            <th>CA</th>
                            <th>CV</th>
                            <th>D</th>
                            <th>GS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.position}</td>
                                <td>{player.age}</td>
                                <td>{player.height || 0}</td>
                                <td>{player.weight || 0}</td>
                                <td>{player.nationality || 'N/A'}</td>
                                <td>{player.games || 0}</td>
                                <td>{player.substitute_appearances || 0}</td>
                                <td>{player.goals || 0}</td>
                                <td>{player.assists || 0}</td>
                                <td>{player.shots || 0}</td>
                                <td>{player.shots_on_goal || 0}</td>
                                <td>{player.fouls_committed || 0}</td>
                                <td>{player.fouls_suffered || 0}</td>
                                <td>{player.yellow_cards || 0}</td>
                                <td>{player.red_cards || 0}</td>
                                <td>{player.defenses || 0}</td>
                                <td>{player.goals_conceded || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
