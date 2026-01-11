// ======================================================
// 🔒 ORDEM OFICIAL ESPN — GOLEIROS (FONTE DA VERDADE)
// ======================================================
export const GOALKEEPER_ESPN_ORDER = [
  'name', 'position', 'age', 'height', 'weight', 'nationality',
  'games', 'substitutions', 'saves', 'goals_conceded', 'assists',
  'fouls_committed', 'fouls_suffered', 'yellow_cards', 'red_cards',
] as const;

// ======================================================
// 🔒 ORDEM OFICIAL ESPN — JOGADORES DE CAMPO (FONTE DA VERDADE)
// ======================================================
export const FIELD_PLAYER_ESPN_ORDER = [
  'name', 'position', 'age', 'height', 'weight', 'nationality',
  'games', 'substitutions', 'goals', 'assists',
  'total_shots', 'shots_on_goal', 'fouls_committed', 'fouls_suffered',
  'yellow_cards', 'red_cards',
] as const;

export const PLAYER_COLUMNS = {
  GOALKEEPER: GOALKEEPER_ESPN_ORDER,
  FIELD_PLAYER: FIELD_PLAYER_ESPN_ORDER,
} as const;
