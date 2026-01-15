export const REGISTER_CONSTANTS = {
  TITLE_BASIC: "Cadastro de Usuário (Básico)",
  TITLE_PREMIUM: "Cadastro de Usuário (Premium Trial)",
  LOGO_SRC: "https://i.ibb.co/HTNLMqjX/cbf2.png",
  LOGO_ALT: "Logo CBF",
  
  LABEL_FULL_NAME: "Nome Completo",
  PLACEHOLDER_FULL_NAME: "Seu nome completo",
  
  LABEL_EMAIL: "Email",
  PLACEHOLDER_EMAIL: "seu@email.com",
  
  LABEL_PROFESSION: "Profissão",
  PLACEHOLDER_PROFESSION: "Selecione sua profissão",
  
  LABEL_PASSWORD: "Senha",
  PLACEHOLDER_PASSWORD: "Sua senha",
  
  BUTTON_SUBMIT: "Criar Conta",
  FOOTER_TEXT: "Já tem uma conta?",
  FOOTER_LINK_TEXT: "Faça login",
  
  ERROR_GENERIC: "Erro ao registrar. Por favor, tente novamente.",
  
  PLANS: {
    FREE: {
      id: 'basic',
      name: 'Grátis',
      description: 'Acesso básico para começar.',
      features: ['Até 5 clubes', 'Relatórios básicos', 'Suporte via email'],
      trialDays: 0
    },
    PREMIUM_TRIAL: {
      id: 'premium',
      name: 'Premium Trial',
      description: 'Experimente todos os recursos por 14 dias.',
      features: ['Clubes ilimitados', 'Relatórios avançados', 'IA de Nutrição', 'Suporte prioritário'],
      trialDays: 14
    }
  }
} as const;

export const PROFESSIONS = [
  "Nutricionista",
  "Analista de Dados",
  "Psicólogo",
  "Técnico",
  "Analista de Estratégia",
  "Analista de Empenho",
  "Diretor de Futebol",
  "Presidente"
] as const;
