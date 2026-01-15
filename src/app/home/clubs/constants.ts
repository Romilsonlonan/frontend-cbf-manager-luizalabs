export const CLUBS_CONSTANTS = {
  TITLE: "Clubes",
  ADD_CLUB_BUTTON: "Adicionar Clube",
  LOADING_MESSAGE: "Carregando...",
  NO_CLUBS_MESSAGE: "Nenhum clube cadastrado",
  ADD_FIRST_CLUB_BUTTON: "Adicionar primeiro clube",
  DELETE_CONFIRMATION: (name: string) => `Tem certeza que deseja excluir o clube ${name}? Esta ação é irreversível.`,
  
  TOAST_ERROR_TITLE: "Erro",
  TOAST_FETCH_ERROR_DESCRIPTION: "Erro ao carregar dados dos clubes.",
  
  TOAST_AUTH_ERROR_TITLE: "Erro de Autenticação",
  TOAST_AUTH_ERROR_DESCRIPTION: "Você precisa estar logado para realizar esta ação.",
  
  TOAST_DELETE_SUCCESS_TITLE: "Sucesso!",
  TOAST_DELETE_SUCCESS_DESCRIPTION: (name: string) => `Clube ${name} excluído com sucesso!`,
  TOAST_DELETE_ERROR_TITLE: "Erro na Exclusão",
  TOAST_DELETE_ERROR_DESCRIPTION: (name: string, error: string) => `Falha ao excluir clube ${name}: ${error}`,
  
  TOAST_SCRAPE_START_TITLE: "Raspagem Iniciada",
  TOAST_SCRAPE_START_DESCRIPTION: (name: string) => `Iniciando raspagem de jogadores para ${name}...`,
  TOAST_SCRAPE_SUCCESS_TITLE: "Sucesso!",
  TOAST_SCRAPE_SUCCESS_DESCRIPTION: (name: string, count: number) => `O valor total de ${count} jogadores do clube ${name} foram realizados com sucesso.`,
  TOAST_SCRAPE_ALREADY_DONE_DESCRIPTION: (name: string, count: number) => `Todos os ${count} jogadores de ${name} já foram adicionados anteriormente!`,
  TOAST_SCRAPE_ERROR_TITLE: "Erro na Raspagem",
  TOAST_SCRAPE_ERROR_DESCRIPTION: (name: string, error: string) => `Falha ao raspar jogadores para ${name}: ${error}`,
  
  TOAST_SESSION_EXPIRED_TITLE: "Sessão Expirada",
  TOAST_SESSION_EXPIRED_DESCRIPTION: "Sua sessão expirou. Por favor, faça login novamente.",
} as const;
