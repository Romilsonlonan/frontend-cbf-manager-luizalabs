// /home/romilson/Projetos/luizalabs/frontend/cbf_manager/src/lib/api.ts
import { ClubSimpleResponse, GoalkeeperResponse, FieldPlayerResponse } from './types'; // Import types

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const register = async (userData: any) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Erro ao registrar usuário' }));
    throw new Error(errorData.detail || 'Erro ao registrar usuário');
  }

  return response.json();
};

export const login = async (email: string, password: string, startLoading: () => void, stopLoading: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    });

    if (!response.ok) {
      console.error('API Response not OK:', response);
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Network or JSON parsing error:', error);
    throw new Error('Network error or invalid response from server');
  } finally {
    stopLoading();
  }
};

export const getCurrentUser = async (token: string, startLoading: () => void, stopLoading: () => void, onAuthError?: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/users/me/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        onAuthError?.();
        throw new Error('Token inválido ou expirado');
      }
      const errorData = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
      console.error('API Response not OK for getCurrentUser:', response.status, errorData);
      throw new Error(errorData.detail || 'Falha ao buscar usuário');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Token inválido')) {
      console.warn('Token inválido detectado, necessário fazer login novamente');
    } else {
      console.error('Network or JSON parsing error for getCurrentUser:', error);
    }
    throw error;
  } finally {
    stopLoading();
  }
};

export const updateUserProfile = async (token: string, userId: number, userData: { name?: string; email?: string }, startLoading: () => void, stopLoading: () => void, onAuthError?: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/users/me/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        onAuthError?.();
        throw new Error('Token inválido ou expirado');
      }
      const errorBody = await response.json();
      console.error('API Response not OK for updateUserProfile:', response, errorBody);
      throw new Error(errorBody.detail || 'Falha ao atualizar perfil');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Network or JSON parsing error for updateUserProfile:', error);
    throw new Error('Erro de rede ou resposta inválida do servidor ao atualizar perfil');
  } finally {
    stopLoading();
  }
};

export const changePassword = async (token: string, currentPassword: string, newPassword: string, startLoading: () => void, stopLoading: () => void, onAuthError?: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/users/me/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        onAuthError?.();
        throw new Error('Token inválido ou expirado');
      }
      
      let errorDetail = 'Falha ao alterar senha';
      try {
        const errorBody = await response.json();
        if (errorBody.detail) {
          if (Array.isArray(errorBody.detail)) {
            errorDetail = errorBody.detail.map((err: any) => err.msg || JSON.stringify(err)).join(', ');
          } else {
            errorDetail = errorBody.detail;
          }
        }
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
      
      console.error('API Response not OK for changePassword:', response.status, errorDetail);
      throw new Error(errorDetail);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Network or JSON parsing error for changePassword:', error);
    throw new Error('Erro de rede ou resposta inválida do servidor ao alterar senha');
  } finally {
    stopLoading();
  }
};

export const deleteAccount = async (token: string, startLoading: () => void, stopLoading: () => void, onAuthError?: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/users/me/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        onAuthError?.();
        throw new Error('Token inválido ou expirado');
      }
      const errorBody = await response.json();
      console.error('API Response not OK for deleteAccount:', response, errorBody);
      throw new Error(errorBody.detail || 'Falha ao excluir conta');
    }
    return true;
  } catch (error) {
    console.error('Network or JSON parsing error for deleteAccount:', error);
    throw new Error('Erro de rede ou resposta inválida do servidor ao excluir conta');
  } finally {
    stopLoading();
  }
};

export const uploadProfileImage = async (token: string, formData: FormData, startLoading: () => void, stopLoading: () => void, onAuthError?: () => void) => {
  startLoading();
  try {
    const response = await fetch(`${API_URL}/users/me/photo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        onAuthError?.();
        throw new Error('Token inválido ou expirado');
      }
      let errorDetail = 'Falha ao fazer upload da foto de perfil';
      let errorBody: any = { detail: 'Erro desconhecido' };

      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorBody = await response.json();
          errorDetail = errorBody.detail || JSON.stringify(errorBody);
        } else {
          errorDetail = await response.text();
          if (!errorDetail) {
            errorDetail = `Erro ${response.status}: ${response.statusText}`;
          }
        }
      } catch (jsonError) {
        console.warn('Failed to parse error response as JSON or text:', jsonError);
        errorDetail = `Erro ${response.status}: ${response.statusText}`;
      }

      console.error('API Response not OK for uploadProfileImage:', response.status, errorDetail);
      throw new Error(errorDetail);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Network or JSON parsing error for uploadProfileImage:', error);
    throw new Error('Erro de rede ou resposta inválida do servidor ao fazer upload da foto de perfil');
  } finally {
    stopLoading();
  }
};

export const createClub = async (formData: FormData) => {
  const response = await fetch(`${API_URL}/clubs/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Erro ao criar clube');
  }

  return response.json();
};

export const getUsers = async (token: string, onAuthError?: () => void): Promise<any[]> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/users/`, { headers });
  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado. Por favor, faça login novamente.');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getUsers:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Erro ao buscar usuários');
  }
  return response.json();
};

export const getClubs = async (token: string, onAuthError?: () => void): Promise<ClubSimpleResponse[]> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/clubs/`, { headers });
  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado. Por favor, faça login novamente.');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getClubs:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Erro ao buscar clubes');
  }
  return response.json();
};

export const getGoalkeepers = async (token: string | null = null, clubId: number | null = null, nameFilter: string = '', onAuthError?: () => void): Promise<GoalkeeperResponse[]> => {
  let url = new URL(`${API_URL}/goalkeepers/`);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (clubId) {
    url.searchParams.append('club_id', clubId.toString());
  }

  if (nameFilter) {
    url.searchParams.append('name', nameFilter);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado. Por favor, faça login novamente.');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getGoalkeepers:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Erro ao buscar goleiros');
  }
  return response.json();
};

export const getFieldPlayers = async (token: string | null = null, clubId: number | null = null, nameFilter: string = '', positionFilter: string = '', onAuthError?: () => void): Promise<FieldPlayerResponse[]> => {
  let url = new URL(`${API_URL}/field_players/`);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (clubId) {
    url.searchParams.append('club_id', clubId.toString());
  }

  if (nameFilter) {
    url.searchParams.append('name', nameFilter);
  }

  if (positionFilter) {
    url.searchParams.append('position', positionFilter);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado. Por favor, faça login novamente.');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getFieldPlayers:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Erro ao buscar jogadores de campo');
  }
  return response.json();
};

export const createGoalkeeper = async (goalkeeperData: any, token: string, clubId: number, onAuthError?: () => void) => {
  const response = await fetch(`${API_URL}/goalkeepers/?club_id=${clubId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(goalkeeperData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for createGoalkeeper:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao criar goleiro');
  }

  return response.json();
};

export const createFieldPlayer = async (fieldPlayerData: any, token: string, clubId: number, onAuthError?: () => void) => {
  const response = await fetch(`${API_URL}/field_players/?club_id=${clubId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(fieldPlayerData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for createFieldPlayer:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao criar jogador de campo');
  }

  return response.json();
};

export const scrapeAthletes = async (clubId: string, url: string, token: string, onAuthError?: () => void) => {
  const response = await fetch(`${API_URL}/scrape-athletes/${clubId}?url=${encodeURIComponent(url)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for scrapeAthletes:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao realizar scraping de athletes');
  }

  return response.json();
};

export const scrapeClubPlayers = async (clubId: number, token: string, onAuthError?: () => void) => {
  const response = await fetch(`${API_URL}/clubs/${clubId}/scrape_players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for scrapeClubPlayers:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao realizar scraping de jogadores do clube');
  }

  return response.json();
};

export const getClubDetails = async (clubId: number): Promise<ClubSimpleResponse> => {
  const token = localStorage.getItem('access_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/clubs/${clubId}`, { headers });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Response not OK for getClubDetails:', response.status, 'Error Data:', errorData);
    throw new Error(errorData.detail || `Erro ao buscar clube com ID ${clubId}: ${response.status}`);
  }
  return response.json();
};

export const addTrainingRoutine = async (clubId: number, routineData: { name: string; description: string }) => {
  const token = localStorage.getItem('access_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/clubs/${clubId}/training_routines`, {
    method: 'POST',
    headers,
    body: JSON.stringify(routineData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for addTrainingRoutine:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao adicionar rotina de treinamento');
  }

  return response.json();
};

export const deleteClub = async (clubId: number, token: string, onAuthError?: () => void) => {
  const response = await fetch(`${API_URL}/clubs/${clubId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for deleteClub:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao excluir clube');
  }
  return true;
};

export const getTopGoalScorers = async (token: string, position?: string, clubId?: number, onAuthError?: () => void): Promise<FieldPlayerResponse[]> => {
  let url = new URL(`${API_URL}/statistics/top_goal_scorers/`);
  if (position) {
    url.searchParams.append('position', position);
  }
  if (clubId) {
    url.searchParams.append('club_id', clubId.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getTopGoalScorers:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao buscar artilheiros');
  }
  return response.json();
};

export const getTopPlayersByStatistic = async (token: string, statistic: string, clubId?: number, onAuthError?: () => void): Promise<(FieldPlayerResponse | GoalkeeperResponse)[]> => {
  let url = new URL(`${API_URL}/statistics/top_players_by_statistic/`);
  if (statistic) {
    url.searchParams.append('statistic', statistic);
  }
  if (clubId) {
    url.searchParams.append('club_id', clubId.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getTopPlayersByStatistic:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao buscar estatísticas de jogadores');
  }
  return response.json();
};

export const getTopPlayersByAge = async (token: string, ageFilter: 'oldest' | 'youngest', clubId?: number, onAuthError?: () => void): Promise<(FieldPlayerResponse | GoalkeeperResponse)[]> => {
  let url = new URL(`${API_URL}/statistics/top_players_by_age/`);
  if (ageFilter) {
    url.searchParams.append('age_filter', ageFilter);
  }
  if (clubId) {
    url.searchParams.append('club_id', clubId.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getTopPlayersByAge:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao buscar jogadores por idade');
  }
  return response.json();
};

export const getTotalAthletesCount = async (token: string, onAuthError?: () => void): Promise<number> => {
  const url = new URL(`${API_URL}/statistics/total_athletes_count/`);
  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getTotalAthletesCount:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao buscar total de atletas');
  }
  const data = await response.json();
  return data.total_count;
};

export const getTotalClubsCount = async (token: string, onAuthError?: () => void): Promise<number> => {
  const url = new URL(`${API_URL}/statistics/total_clubs_count/`);
  const response = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for getTotalClubsCount:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao buscar total de clubes');
  }
  const data = await response.json();
  return data.total_count;
};

export const scrapeBrasileiraoLeaderboard = async (token: string, onAuthError?: () => void): Promise<any[]> => {
  const url = new URL(`${API_URL}/api/scraper/brasileirao-leaderboard`);
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      onAuthError?.();
      throw new Error('Token inválido ou expirado');
    }
    const errorBody = await response.json().catch(() => ({ detail: 'Erro desconhecido' }));
    console.error('API Response not OK for scrapeBrasileiraoLeaderboard:', response.status, errorBody);
    throw new Error(errorBody.detail || 'Falha ao raspar dados do Brasileirão Leaderboard');
  }
  const data = await response.json();
  
  // Mapeia os campos do backend para os campos esperados pelo frontend (TeamStats)
  // Backend: posicao, clube_nome, clube_id, pontos, jogos, vitorias, empates, derrotas, saldo_gols
  // Frontend: name, p, j, v, e, d, gp, gc, sg
  const classificacao = data.classificacao || [];
  
  return classificacao.map((item: any) => ({
    name: item.clube_nome,
    p: item.pontos,
    j: item.jogos,
    v: item.vitorias,
    e: item.empates,
    d: item.derrotas,
    gp: item.gols_pro || 0, // Adicionado fallback se o backend não retornar
    gc: item.gols_contra || 0,
    sg: item.saldo_gols
  }));
};

export const updateAthleteHealth = async (athleteId: number, isGoalkeeper: boolean, healthData: any, token: string) => {
  const response = await fetch(`${API_URL}/athletes/${athleteId}/health?is_goalkeeper=${isGoalkeeper}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(healthData),
  });
  if (!response.ok) throw new Error('Erro ao atualizar saúde do atleta');
  return response.json();
};

export const createAthleteProgress = async (progressData: any, token: string) => {
  const response = await fetch(`${API_URL}/athletes/progress/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(progressData),
  });
  if (!response.ok) throw new Error('Erro ao criar progresso do atleta');
  return response.json();
};

export const getAthleteProgress = async (athleteId: number, isGoalkeeper: boolean, token: string) => {
  const response = await fetch(`${API_URL}/athletes/${athleteId}/progress?is_goalkeeper=${isGoalkeeper}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Erro ao buscar progresso do atleta');
  return response.json();
};

export const createNutritionalPlan = async (planData: any, token: string) => {
  const response = await fetch(`${API_URL}/athletes/nutritional_plans/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(planData),
  });
  if (!response.ok) throw new Error('Erro ao criar plano nutricional');
  return response.json();
};

export const getNutritionalPlans = async (athleteId: number, isGoalkeeper: boolean, token: string) => {
  const response = await fetch(`${API_URL}/athletes/${athleteId}/nutritional_plans?is_goalkeeper=${isGoalkeeper}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Erro ao buscar planos nutricionais');
  return response.json();
};

export const deleteNutritionalPlan = async (planId: number, token: string) => {
  const response = await fetch(`${API_URL}/athletes/nutritional_plans/${planId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Erro ao excluir plano nutricional');
  return true;
};

export const getAppointments = async (token: string, startDate?: string, endDate?: string) => {
  let url = new URL(`${API_URL}/appointments/`);
  if (startDate) url.searchParams.append('start_date', startDate);
  if (endDate) url.searchParams.append('end_date', endDate);
  
  const response = await fetch(url.toString(), {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Erro ao buscar consultas');
  return response.json();
};

export const createAppointment = async (appointmentData: any, token: string) => {
  const response = await fetch(`${API_URL}/appointments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentData),
  });
  if (!response.ok) throw new Error('Erro ao criar consulta');
  return response.json();
};

export const updateAppointmentStatus = async (appointmentId: number, status: string, token: string) => {
  const response = await fetch(`${API_URL}/appointments/${appointmentId}/status?status=${status}`, {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Erro ao atualizar status da consulta');
  return response.json();
};

export const updateAppointment = async (appointmentId: number, appointmentData: any, token: string) => {
  const response = await fetch(`${API_URL}/appointments/${appointmentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentData),
  });
  if (!response.ok) throw new Error('Erro ao atualizar consulta');
  return response.json();
};

export const deleteAppointment = async (appointmentId: number, token: string) => {
  const response = await fetch(`${API_URL}/appointments/${appointmentId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Erro ao excluir consulta');
  return true;
};

export const getServices = async () => {
  const response = await fetch(`${API_URL}/services/`);
  if (!response.ok) throw new Error('Erro ao buscar serviços');
  return response.json();
};

export const getLocations = async () => {
  const response = await fetch(`${API_URL}/locations/`);
  if (!response.ok) throw new Error('Erro ao buscar locais');
  return response.json();
};

export const getAvailabilities = async (token: string) => {
  const response = await fetch(`${API_URL}/availabilities/`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Erro ao buscar disponibilidades');
  return response.json();
};

export const updateAvailability = async (availabilityData: any, token: string) => {
  const response = await fetch(`${API_URL}/availabilities/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(availabilityData),
  });
  if (!response.ok) throw new Error('Erro ao atualizar disponibilidade');
  return response.json();
};

export const createLocation = async (locationData: any, token: string) => {
  const response = await fetch(`${API_URL}/locations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(locationData),
  });
  if (!response.ok) throw new Error('Erro ao criar local');
  return response.json();
};

export const createService = async (serviceData: any, token: string) => {
  const response = await fetch(`${API_URL}/services/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(serviceData),
  });
  if (!response.ok) throw new Error('Erro ao criar serviço');
  return response.json();
};

export const createPaymentIntent = async (token: string) => {
  const response = await fetch(`${API_URL}/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Erro ao criar intenção de pagamento');
  return response.json();
};

export const api = {
  login,
  getCurrentUser,
  updateUserProfile,
  changePassword,
  deleteAccount,
  uploadProfileImage,
  createClub,
  getUsers,
  getClubs,
  getClubDetails,
  getGoalkeepers,
  getFieldPlayers,
  createGoalkeeper,
  createFieldPlayer,
  addTrainingRoutine,
  deleteClub,
  getTopGoalScorers,
  getTopPlayersByStatistic,
  getTopPlayersByAge,
  getTotalAthletesCount,
  getTotalClubsCount,
  scrapeBrasileiraoLeaderboard,
  updateAthleteHealth,
  createAthleteProgress,
  getAthleteProgress,
  createNutritionalPlan,
  getNutritionalPlans,
  deleteNutritionalPlan,
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment,
  getServices,
  createService,
  getLocations,
  createLocation,
  getAvailabilities,
  updateAvailability,
  register,
  createPaymentIntent,
};

export const clubsApi = {
  scrapeAthletes,
  scrapeClubPlayers,
};
