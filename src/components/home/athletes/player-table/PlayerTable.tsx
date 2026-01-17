'use client';

import React from 'react';
import styles from './PlayerTable.module.css';
import { GoalkeeperResponse, FieldPlayerResponse } from '@/lib/types';
import type { PlayerStatsColumn } from '@/lib/definitions';

type PlayerType = GoalkeeperResponse | FieldPlayerResponse;

interface PlayerTableProps {
    players: PlayerType[];
    isLoading: boolean;
    error: string | null;
    columns?: PlayerStatsColumn[];
}

export function PlayerTable({ players, isLoading, error, columns }: PlayerTableProps) {
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

    const isGoalkeeperTable = players.length > 0 && players[0].player_type === 'goalkeeper';

    return (
        <div className={styles.playerTableContainer}>
            <h3 className={styles.playerTableTitle}>Tabela de {isGoalkeeperTable ? 'Goleiros' : 'Jogadores de Campo'}</h3>
            <div className={styles.tableWrapper}>
                <table className={styles.playerTable}>
                    <thead>
                        <tr>
                            {columns?.map((col) => (
                                <th key={col.key}>{col.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.id}>
                                {columns?.map((col) => (
                                    <td key={col.key} className={styles.tableBodyCell}>
                                        {(player as any)[col.key] ?? 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {players.length > 20 && (
                <p className="text-xs text-gray-500 mt-2 text-center italic">
                    Total de {players.length} jogadores. Role verticalmente para ver a lista completa.
                </p>
            )}
        </div>
    );
}
