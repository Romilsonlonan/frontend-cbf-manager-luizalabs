'use server';

import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const MISTRAL_API_KEY = "c5AEU69RT95B4kgqz6dQsgMyZCYvGx2K";

const chat = new ChatMistralAI({
  apiKey: MISTRAL_API_KEY,
  model: "mistral-large-latest",
});

export async function generateNutritionalPlanAction(athleteData: any) {
  try {
    const systemPrompt = `
      Você é um nutricionista esportivo de alto desempenho trabalhando para a CBF (Confederação Brasileira de Futebol).
      Sua tarefa é criar um plano alimentar balanceado e personalizado para um atleta de elite.
      Você deve realizar uma avaliação final baseada nos dados fornecidos.
    `;

    const formatValue = (val: any, unit: string) => (val && val !== 0) ? `${val} ${unit}` : 'Não informado';

    const userPrompt = `
      DADOS DO ATLETA SELECIONADO (OBRIGATÓRIO USAR ESTES DADOS):
      Nome: ${athleteData.name}
      Idade: ${athleteData.age} anos
      Posição: ${athleteData.position}
      Peso: ${formatValue(athleteData.weight, 'kg')}
      Altura: ${formatValue(athleteData.height, 'cm')}
      % de Gordura: ${formatValue(athleteData.bodyFat, '%')}
      % de Músculo: ${formatValue(athleteData.muscle, '%')}
      
      DADOS LABORATORIAIS (Se estiver 0 ou vazio, considere como "Não informado"):
      - Colesterol HDL: ${formatValue(athleteData.labData?.hdl, 'mg/dL')}
      - Colesterol LDL: ${formatValue(athleteData.labData?.ldl, 'mg/dL')}
      - Colesterol Total: ${formatValue(athleteData.labData?.totalCholesterol, 'mg/dL')}
      - Triglicerídeos: ${formatValue(athleteData.labData?.triglycerides, 'mg/dL')}
      
      CONTEXTO ADICIONAL:
      ${athleteData.additionalContext || 'Nenhum contexto adicional fornecido.'}
      
      INSTRUÇÕES PARA AVALIAÇÃO FINAL:
      1. Analise os dados físicos e laboratoriais detalhadamente.
      2. Calcule o Gasto Energético Basal e Total estimado com base no peso, altura, idade e nível de atividade física esperado para a posição (${athleteData.position}).
      3. Considere as demandas energéticas específicas da posição (${athleteData.position}) - ex: goleiros precisam de explosão, meio-campistas de resistência.
      4. Crie um plano de refeições detalhado (Café da manhã, Lanche, Almoço, Pré-treino, Pós-treino, Jantar, Ceia) focado em atingir o equilíbrio calórico e de macronutrientes ideal.
      5. Forneça orientações sobre hidratação.
      6. Se os níveis de colesterol ou triglicerídeos estiverem fora do normal, ajuste a dieta para auxiliar na normalização (ex: redução de gorduras saturadas, aumento de fibras).
      7. Use uma linguagem profissional, clara e motivadora, como se estivesse em uma consulta real.
      8. Formate a resposta em Markdown para uma leitura agradável, usando negrito para horários e alimentos principais.
    `;

    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(userPrompt),
    ];

    const response = await chat.invoke(messages);
    
    // Garantir que o conteúdo seja sempre uma string
    const planContent = typeof response.content === 'string' 
      ? response.content 
      : JSON.stringify(response.content);

    return { success: true, plan: planContent };
  } catch (error) {
    console.error('Erro ao gerar plano nutricional com Mistral AI:', error);
    return { success: false, error: 'Falha ao gerar o plano alimentar com Mistral AI. Por favor, tente novamente.' };
  }
}
