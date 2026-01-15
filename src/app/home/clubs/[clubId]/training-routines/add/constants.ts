export const ADD_TRAINING_ROUTINE_CONSTANTS = {
  SUCCESS_TOAST_TITLE: "Sucesso",
  SUCCESS_TOAST_DESCRIPTION: "Rotina de treinamento adicionada com sucesso!",
  ERROR_TOAST_TITLE: "Erro",
  ERROR_TOAST_DESCRIPTION: (msg: string) => `Não foi possível adicionar a rotina: ${msg}`,
  LOADING_CLUB: "Carregando dados do clube...",
  CLUB_NOT_FOUND: "Clube não encontrado.",
} as const;
