export interface GlossarioTermo {
    abreviacao: string;
    termo: string;
    iconName: string | null; // Changed to iconName
    definicao: string;
}

export const termosGlossario: GlossarioTermo[] = [
    { abreviacao: 'Nome', termo: 'Nome', iconName: 'UserIcon', definicao: 'Nome completo do atleta' },
    { abreviacao: 'POS', termo: 'Posição', iconName: 'CompassIcon', definicao: 'Posição do jogador' },
    { abreviacao: 'Idade', termo: 'Idade', iconName: null, definicao: 'Idade atual do jogador' },
    { abreviacao: 'Alt', termo: 'Altura', iconName: 'RulerIcon', definicao: 'Altura do jogador' },
    { abreviacao: 'P', termo: 'Peso', iconName: 'WeightIcon', definicao: 'Peso do jogador' },
    { abreviacao: 'NAC', termo: 'Nacionalidade', iconName: 'FlagIcon', definicao: 'Nacionalidade do jogador' },
    { abreviacao: 'J', termo: 'Jogos', iconName: 'ShirtIcon', definicao: 'Número de jogos disputados' },
    { abreviacao: 'SUB', termo: 'Substitute Appearances', iconName: 'ArrowRightLeftIcon', definicao: 'Número de aparições como substituto' },
    { abreviacao: 'G', termo: 'Gols', iconName: 'GoalIcon', definicao: 'Total de gols marcados' },
    { abreviacao: 'A', termo: 'Assistências', iconName: 'HandshakeIcon', definicao: 'Total de assistências' },
    { abreviacao: 'TC', termo: 'Finalizações', iconName: 'CrosshairIcon', definicao: 'Total de finalizações' },
    { abreviacao: 'CG', termo: 'Chutes a Gol', iconName: 'TargetIcon', definicao: 'Total de chutes a gol' },
    { abreviacao: 'FC', termo: 'Faltas Cometidas', iconName: 'GavelIcon', definicao: 'Total de faltas cometidas' },
    { abreviacao: 'FS', termo: 'Faltas Sofridas', iconName: 'ScaleIcon', definicao: 'Total de faltas sofridas' },
    { abreviacao: 'CA', termo: 'Cartões Amarelos', iconName: 'CreditCardIcon', definicao: 'Total de cartões amarelos' },
    { abreviacao: 'CV', termo: 'Cartões Vermelhos', iconName: 'SquareSlashIcon', definicao: 'Total de cartões vermelhos' },
    { abreviacao: 'D', termo: 'Defesas', iconName: 'ShieldAlertIcon', definicao: 'Total de defesas (para goleiros)' },
    { abreviacao: 'GS', termo: 'Gols Sofridos', iconName: 'GoalIcon', definicao: 'Total de gols sofridos (para goleiros)' },
];
