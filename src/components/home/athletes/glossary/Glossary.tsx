import React from 'react';
import styles from './Glossary.module.css';

export const Glossary: React.FC = () => {
  const items = [
    { label: 'Nome:', value: 'Nome' },
    { label: 'POS:', value: 'Posição' },
    { label: 'Idade:', value: 'Idade atual do jogador' },
    { label: 'Alt:', value: 'Altura' },
    { label: 'P:', value: 'Peso' },
    { label: 'NAC:', value: 'Nacionalidade' },
    { label: 'J:', value: 'Jogos' },
    { label: 'SUB:', value: 'Substitute Appearances' },
    { label: 'G:', value: 'Total de gols' },
    { label: 'A:', value: 'Assistências' },
    { label: 'TC:', value: 'Finalizações' },
    { label: 'CG:', value: 'Chutes a gol' },
    { label: 'FC:', value: 'Faltas cometidas' },
    { label: 'FS:', value: 'Faltas sofridas' },
    { label: 'CA:', value: 'Cartões amarelos' },
    { label: 'CV:', value: 'Cartões vermelhos' },
    { label: 'D:', value: 'Defesas' },
    { label: 'GS:', value: 'Gols sofridos' },
  ];

  return (
    <div className={styles.glossaryContainer}>
      <p className={styles.glossaryTitle}>Glossário</p>
      <div className={styles.glossaryGrid}>
        {items.map((item, index) => (
          <div key={index} className={styles.glossaryItem}>
            <span className={styles.glossaryLabel}>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
