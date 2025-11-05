# Documentação Técnica: Módulo de Autenticação e Gerenciamento de Usuários

## Visão Geral

Este documento detalha o módulo de autenticação e gerenciamento de usuários do frontend `cbf_manager`, desenvolvido em Next.js e TypeScript. Ele abrange as funcionalidades de login, registro e o contexto de autenticação que gerencia o estado do usuário na aplicação. A comunicação com o backend é realizada através de uma API RESTful, garantindo a segurança e a persistência dos dados do usuário.

A arquitetura segue o padrão de componentes reativos, utilizando `React Context` para gerenciar o estado global de autenticação e `Next.js Pages` para as rotas de interface do usuário.

## Componentes e Funcionalidades

### `AuthContext.tsx`

Este arquivo define o contexto de autenticação da aplicação, responsável por gerenciar o estado de login do usuário, armazenar informações do usuário e fornecer funções para login e logout.

#### Interfaces

-   **`User`**:
    -   **Descrição**: Define a estrutura dos dados do usuário autenticado.
    -   **Atributos**:
        -   `id`: `number` - Identificador único do usuário.
        -   `email`: `string` - Endereço de e-mail do usuário.
        -   `is_active`: `boolean` - Indica se a conta do usuário está ativa.
        -   `name?`: `string` (opcional) - Nome do usuário.

-   **`AuthContextType`**:
    -   **Descrição**: Define a estrutura do objeto de contexto de autenticação.
    -   **Atributos**:
        -   `user`: `User | null` - Objeto `User` se o usuário estiver logado, `null` caso contrário.
        -   `isLoggedIn`: `boolean` - Indica se há um usuário logado.
        -   `login`: `(token: string) => void` - Função para realizar o login, recebendo um token de acesso.
        -   `logout`: `() => void` - Função para realizar o logout.
        -   `loading`: `boolean` - Indica se o `AuthContext` está em processo de carregamento (e.g., verificando token inicial).

#### `AuthContext`

-   **Descrição**: O objeto `React Context` criado para armazenar e distribuir o estado de autenticação.

#### `AuthProvider` Componente

-   **Descrição**: Componente provedor que encapsula a lógica de autenticação e disponibiliza o `AuthContext` para seus filhos.
-   **Props**:
    -   `children`: `ReactNode` - Os componentes filhos que terão acesso ao contexto de autenticação.
-   **Estado Interno**:
    -   `user`: `User | null` - Estado que armazena as informações do usuário.
    -   `isLoggedIn`: `boolean` - Estado que indica o status de login.
    -   `loading`: `boolean` - Estado de carregamento específico do `AuthContext`.
-   **`useEffect` (Carregamento Inicial do Usuário)**:
    -   **Função**: `loadUser`
    -   **Descrição**: Executado uma vez ao montar o componente para verificar a existência de um token de autenticação no `localStorage`. Se um token for encontrado, tenta buscar os dados do usuário no backend.
    -   **Fluxo de Dados**:
        1.  **Frontend (Browser)**: Verifica `localStorage` por `token`.
        2.  **Frontend -> Backend**: Se `token` existe, chama `api.getCurrentUser(token, startLoading, stopLoading)`.
        3.  **Backend -> Frontend**: Retorna `User` object (sucesso) ou erro (falha, e.g., token inválido).
        4.  **Frontend (Browser)**: Atualiza `user` e `isLoggedIn` com base na resposta. Em caso de token inválido, remove o token do `localStorage` e define `isLoggedIn` como `false`.
-   **`login` Função**:
    -   **Descrição**: Armazena o token de acesso no `localStorage`, define `isLoggedIn` como `true` e busca os dados do usuário no backend.
    -   **Ações no Frontend**:
        1.  Recebe `token` como parâmetro.
        2.  Armazena `token` em `localStorage`.
        3.  Define `isLoggedIn` para `true`.
        4.  Chama `api.getCurrentUser` para obter os detalhes do usuário.
    -   **Respostas do Backend**:
        1.  `api.getCurrentUser` retorna o objeto `User` em caso de sucesso.
        2.  `api.getCurrentUser` lança um erro em caso de falha (e.g., token inválido).
    -   **Fluxo de Dados**:
        1.  **Frontend (Browser)**: `login(token)` é chamado.
        2.  **Frontend (Browser)**: `localStorage.setItem('token', token)`.
        3.  **Frontend -> Backend**: `api.getCurrentUser(token, startLoading, stopLoading)`.
        4.  **Backend -> Frontend**: Retorna `User` object.
        5.  **Frontend (Browser)**: `setUser(currentUser)`, `setLoading(false)`.
-   **`logout` Função**:
    -   **Descrição**: Remove o token de acesso do `localStorage`, define `isLoggedIn` como `false`, limpa o estado `user` e redireciona para a página de login.
    -   **Ações no Frontend**:
        1.  Remove `token` do `localStorage`.
        2.  Define `isLoggedIn` para `false`.
        3.  Define `user` para `null`.
        4.  Redireciona o usuário para `/login` usando `router.push`.

#### `useAuth` Hook

-   **Descrição**: Hook personalizado para consumir o `AuthContext`, garantindo que seja usado dentro de um `AuthProvider`.
-   **Retorno**: O objeto `AuthContextType` contendo `user`, `isLoggedIn`, `login`, `logout` e `loading`.

### `login/page.tsx`

Esta página representa a interface de usuário para o login na aplicação.

#### `LoginPage` Componente

-   **Descrição**: Componente funcional que renderiza o formulário de login.
-   **Estado Interno**:
    -   `email`: `string` - Armazena o valor do campo de e-mail.
    -   `password`: `string` - Armazena o valor do campo de senha.
    -   `loading`: `boolean` - Controla o estado de carregamento do formulário.
    -   `error`: `string` - Armazena mensagens de erro a serem exibidas.
-   **`handleSubmit` Função**:
    -   **Descrição**: Lida com o envio do formulário de login.
    -   **Ações no Frontend**:
        1.  Define `loading` como `true` e limpa `error`.
        2.  Chama `api.login(email, password, startLoading, stopLoading)`.
        3.  Se bem-sucedido, chama `authLogin(data.access_token)` do `AuthContext` e redireciona para `/home`.
        4.  Em caso de erro, define a mensagem de erro.
        5.  Define `loading` como `false` no `finally`.
    -   **Interação Frontend -> Backend**:
        1.  **Frontend**: Envia `email` e `password` para o endpoint `/token` do backend via `api.login`.
        2.  **Backend**: Autentica as credenciais.
        3.  **Backend -> Frontend**: Retorna um objeto JSON contendo `access_token` em caso de sucesso (HTTP 200 OK) ou um erro (HTTP 401 Unauthorized, etc.).
    -   **Fluxo de Dados**:
        1.  **Frontend (Browser)**: Usuário preenche `email` e `password` e clica em "Login".
        2.  **Frontend -> Backend**: `api.login` envia `POST` para `${API_URL}/token` com `username` e `password` no corpo `x-www-form-urlencoded`.
        3.  **Backend -> Frontend**: Retorna `{ "access_token": "..." }` ou erro.
        4.  **Frontend (Browser)**: Se `access_token` recebido, `authLogin(access_token)` é chamado, e o usuário é redirecionado para `/home`. Caso contrário, exibe `error`.

### `register/page.tsx`

Esta página representa a interface de usuário para o registro de novos usuários na aplicação.

#### `RegisterPage` Componente

-   **Descrição**: Componente funcional que renderiza o formulário de registro.
-   **`registerUser` Função (Server Action)**:
    -   **Descrição**: Função assíncrona que será executada no servidor para lidar com o registro de um novo usuário. Atualmente, apenas redireciona para a página de aprovação pendente.
    -   **Ações no Frontend**:
        1.  Usuário preenche "Nome Completo", "Email" e "Senha".
        2.  Clica em "Criar Conta".
    -   **Interação Frontend -> Backend**:
        1.  **Frontend**: O formulário envia os dados para a `registerUser` (server action).
        2.  **Backend (futuramente)**: Receberá os dados, validará e salvará o usuário no banco de dados.
        3.  **Backend -> Frontend**: Atualmente, redireciona para `/pending-approval`.
    -   **Fluxo de Dados**:
        1.  **Frontend (Browser)**: Usuário preenche formulário e clica em "Criar Conta".
        2.  **Frontend -> Server Action**: Dados do formulário são enviados para `registerUser`.
        3.  **Server Action (Next.js)**: Redireciona o usuário para `/pending-approval`.
        4.  **Frontend (Browser)**: Usuário é levado para a página de aprovação pendente.

### `api.ts`

Este arquivo contém as funções para interagir com a API do backend.

#### `API_URL` Constante

-   **Descrição**: URL base da API do backend, configurável via variável de ambiente `NEXT_PUBLIC_API_URL` ou `http://localhost:8000` por padrão.

#### `api.login` Função

-   **Descrição**: Realiza uma requisição POST para o endpoint de token do backend para autenticar um usuário.
-   **Parâmetros**:
    -   `email`: `string` - E-mail do usuário.
    -   `password`: `string` - Senha do usuário.
    -   `startLoading`: `() => void` - Função para iniciar o estado de carregamento global.
    -   `stopLoading`: `() => void` - Função para parar o estado de carregamento global.
-   **Interação Frontend -> Backend**:
    1.  **Frontend**: Envia `POST` para `${API_URL}/token`.
    2.  **Headers**: `Content-Type: application/x-www-form-urlencoded`.
    3.  **Body**: `username=<email>&password=<password>`.
    4.  **Backend**: Valida as credenciais.
    5.  **Backend -> Frontend**: Retorna `{ access_token: string, token_type: string }` em caso de sucesso (HTTP 200 OK) ou um erro (HTTP 401 Unauthorized).
-   **Fluxo de Dados**:
    1.  **Frontend**: `api.login` é chamado com credenciais.
    2.  **Frontend -> Backend**: Requisição `POST` para `/token`.
    3.  **Backend**: Processa credenciais, gera token JWT.
    4.  **Backend -> Frontend**: Retorna token JWT.
    5.  **Frontend**: Retorna o objeto de dados (`access_token`).

#### `api.getCurrentUser` Função

-   **Descrição**: Realiza uma requisição GET para obter os dados do usuário atualmente autenticado.
-   **Parâmetros**:
    -   `token`: `string` - Token de acesso JWT.
    -   `startLoading`: `() => void` - Função para iniciar o estado de carregamento global.
    -   `stopLoading`: `() => void` - Função para parar o estado de carregamento global.
-   **Interação Frontend -> Backend**:
    1.  **Frontend**: Envia `GET` para `${API_URL}/users/me/`.
    2.  **Headers**: `Content-Type: application/json`, `Authorization: Bearer <token>`.
    3.  **Backend**: Valida o token JWT e busca os dados do usuário associado.
    4.  **Backend -> Frontend**: Retorna o objeto `User` em caso de sucesso (HTTP 200 OK) ou um erro (HTTP 401 Unauthorized se o token for inválido/expirado, ou outros erros).
-   **Fluxo de Dados**:
    1.  **Frontend**: `api.getCurrentUser` é chamado com o token.
    2.  **Frontend -> Backend**: Requisição `GET` para `/users/me/`.
    3.  **Backend**: Valida o token, busca usuário no DB.
    4.  **Backend -> Frontend**: Retorna dados do usuário.
    5.  **Frontend**: Retorna o objeto `User`.

## Interação entre Frontend e Backend

### Fluxo de Login

1.  **Ação no Frontend**: O usuário acessa a página `/login`, preenche os campos de e-mail e senha no `LoginPage` e clica no botão "Login".
2.  **Chamada Frontend -> Backend**: A função `handleSubmit` do `LoginPage` chama `api.login(email, password, startLoading, stopLoading)`. Esta função envia uma requisição `POST` para o endpoint `/token` do backend.
3.  **Processamento no Backend**: O backend recebe as credenciais, as valida e, se forem válidas, gera um JSON Web Token (JWT) e o retorna.
4.  **Resposta Backend -> Frontend**: O frontend recebe o `access_token`.
5.  **Ações no Frontend**:
    *   O `LoginPage` chama `authLogin(access_token)` do `AuthContext`.
    *   O `AuthContext` armazena o `access_token` no `localStorage`.
    *   O `AuthContext` então chama `api.getCurrentUser(access_token, startLoading, stopLoading)` para obter os detalhes completos do usuário.
    *   Com os dados do usuário, o `AuthContext` atualiza seu estado (`user`, `isLoggedIn`).
    *   O `LoginPage` redireciona o usuário para a página `/home`.

### Fluxo de Registro

1.  **Ação no Frontend**: O usuário acessa a página `/register`, preenche os campos de nome completo, e-mail e senha no `RegisterPage` e clica no botão "Criar Conta".
2.  **Chamada Frontend -> Backend (futuramente)**: Atualmente, a função `registerUser` é uma `server action` que apenas redireciona. No futuro, esta função enviaria os dados do novo usuário para um endpoint de registro no backend.
3.  **Processamento no Backend (futuramente)**: O backend receberia os dados, validaria-os, criaria uma nova conta de usuário no banco de dados e, possivelmente, enviaria um e-mail de confirmação ou definiria o status como "pendente de aprovação".
4.  **Resposta Backend -> Frontend (futuramente)**: O backend retornaria um status de sucesso ou erro.
5.  **Ações no Frontend**: Atualmente, o `RegisterPage` redireciona o usuário para a página `/pending-approval` após o envio do formulário, indicando que a conta aguarda aprovação.

### Gerenciamento de Sessão do Usuário

1.  **Carregamento Inicial**: Ao carregar a aplicação, o `AuthProvider` verifica a existência de um `token` no `localStorage`. Se presente, tenta autenticar o usuário chamando `api.getCurrentUser`.
2.  **Persistência**: O `access_token` é armazenado no `localStorage` para manter a sessão do usuário entre as recargas da página.
3.  **Logout**: A função `logout` no `AuthContext` remove o token do `localStorage`, limpa o estado do usuário e redireciona para a página de login, encerrando a sessão.
4.  **Tratamento de Token Inválido/Expirado**: Se `api.getCurrentUser` retornar um erro indicando um token inválido ou expirado (e.g., HTTP 401), o `AuthContext` automaticamente remove o token do `localStorage` e define o usuário como deslogado, forçando uma nova autenticação.

## Configuração CORS (Cross-Origin Resource Sharing)

A política de segurança CORS é crucial para permitir que o frontend (executado em um domínio/porta diferente) se comunique com o backend. Sem a configuração correta, o navegador bloqueará as requisições, resultando em erros como "Pedido de origem cruzada bloqueado: A política de mesma origem não permite a leitura do recurso remoto...".

No backend FastAPI (`backend/fastapi_core/app/app.py`), a configuração CORS é definida da seguinte forma:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8000",  # Backend FastAPI
        "http://127.0.0.1:8000",  # Backend FastAPI
        "http://localhost:3000",  # Frontend React (Next.js dev server)
        "http://localhost:9000",  # Possível porta alternativa para o frontend
        "http://localhost:9002"   # Possível porta alternativa para o frontend
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)
```

-   **`allow_origins`**: Lista de URLs que têm permissão para fazer requisições ao backend. É fundamental incluir todas as origens onde o frontend pode estar rodando (e.g., `localhost:3000`, `localhost:9000`, `localhost:9002` para desenvolvimento).
-   **`allow_credentials`**: Permite que cookies e cabeçalhos de autorização sejam enviados em requisições de origem cruzada.
-   **`allow_methods`**: Define os métodos HTTP permitidos (GET, POST, PUT, DELETE, OPTIONS, PATCH).
-   **`allow_headers`**: Permite todos os cabeçalhos em requisições de origem cruzada.
-   **`expose_headers`**: Permite que o navegador acesse cabeçalhos de resposta específicos.
-   **`max_age`**: Tempo em segundos que as respostas de pré-voo (preflight) podem ser armazenadas em cache.

A ausência ou configuração incorreta dessas origens pode levar a problemas de login e acesso à API, como o erro `NetworkError when attempting to fetch resource` e `cabeçalho CORS ‘Access-Control-Allow-Origin’ em falta`.

## Importância do Banco de Dados `app.db`

O arquivo `app.db` (localizado em `backend/fastapi_core/app.db` ou configurado via `DATABASE_URL` no `.env`) é o banco de dados SQLite utilizado pela aplicação FastAPI. Ele armazena todos os dados persistentes do sistema, incluindo:

-   **Usuários**: Informações de login, senhas hash, etc.
-   **Clubes**: Dados dos clubes de futebol.
-   **Jogadores**: Informações detalhadas dos atletas.

### Para Orientação e Aprendizagem:

1.  **Persistência de Dados**: O `app.db` garante que todos os dados criados, atualizados ou excluídos através da API sejam salvos e permaneçam disponíveis mesmo após o reinício do servidor. Isso é fundamental para qualquer aplicação que precise manter o estado.
2.  **Estrutura do Banco de Dados**: A estrutura das tabelas dentro do `app.db` é definida pelos modelos SQLAlchemy (`backend/fastapi_core/app/models.py`) e gerenciada por migrações Alembic. Entender esses modelos é essencial para compreender como os dados são organizados e relacionados.
3.  **Interação com a API**: Todas as operações de CRUD (Create, Read, Update, Delete) realizadas pelas rotas da API (`backend/fastapi_core/app/app.py`) interagem diretamente com este banco de dados através das funções definidas em `backend/fastapi_core/app/crud.py`.
4.  **Depuração e Testes**: Durante o desenvolvimento, inspecionar o conteúdo de `app.db` (usando ferramentas como `sqlitebrowser`) pode ser muito útil para depurar problemas de dados ou verificar se as operações da API estão funcionando como esperado.
5.  **Criação Automática de Admin**: A aplicação inclui uma lógica para criar automaticamente um usuário administrador (`admin@cbfmanager.com` com senha `admin123`) se ele ainda não existir no `app.db`. Isso facilita o início do desenvolvimento e testes.

## Gerenciamento de Atletas

Este módulo é responsável por exibir, gerenciar e atualizar informações sobre os atletas.

## Glossário de Filtros de Atletas

-   **Nome**: Nome do jogador
-   **POS**: Posição
-   **Idade**: Idade atual do jogador
-   **Alt**: Altura
-   **P**: Peso
-   **NAC**: Nacionalidade
-   **J**: Jogos
-   **SUB**: Substitute Appearances
-   **G**: Total de gols
-   **A**: Assistências
-   **TC**: Finalizações
-   **CG**: Chutes a gol
-   **FC**: Faltas cometidas
-   **FS**: Faltas sofridas
-   **CA**: Cartões amarelos
-   **CV**: Cartões Vermelhos
-   **D**: Defesas
-   **GS**: Gols sofridos

### `src/app/home/atletas/page.tsx`

-   **Descrição**: Esta é a página principal para a visualização e gerenciamento de atletas. Ela interage com o backend para buscar e exibir a lista de atletas.
-   **Funcionalidades**:
    -   Exibição de uma lista paginada de atletas.
    -   Possibilidade de filtrar e pesquisar atletas.
    -   Integração com componentes para ações específicas de atletas.

### `src/components/atualizar-atletas.tsx`

-   **Descrição**: Componente responsável por funcionalidades de atualização de dados de atletas. Pode incluir formulários para edição de informações ou acionamento de processos de sincronização.
-   **Interação com Backend**: Envia requisições `PUT` ou `PATCH` para endpoints como `/athletes/{athlete_id}` para atualizar dados específicos de um atleta.

### Fluxo de Dados (Atletas)

1.  **Carregamento da Página**: Ao acessar `/home/atletas`, a página `page.tsx` faz uma requisição `GET` para o backend (e.g., `/athletes/`) para obter a lista de atletas.
2.  **Exibição**: Os dados recebidos são renderizados em uma tabela ou lista, permitindo a interação do usuário.
3.  **Atualização**: O componente `atualizar-atletas.tsx` pode ser acionado para modificar os dados de um atleta, enviando uma requisição de atualização para o backend.

## Gerenciamento de Clubes

Este módulo lida com o cadastro, visualização, filtragem e gerenciamento de clubes, incluindo a integração com o processo de scraping de dados.

### `src/app/home/clubs/page.tsx`

-   **Descrição**: Página principal para a visualização e gerenciamento de clubes. Exibe a lista de clubes e oferece funcionalidades para adicionar e filtrar.
-   **Funcionalidades**:
    -   Exibição de uma lista de clubes.
    -   Formulário para adicionar novos clubes.
    -   Funcionalidade de filtragem baseada em dados raspados.

### `src/components/clubs/add-club-modal.tsx`

-   **Descrição**: Componente modal que contém o formulário para cadastrar um novo clube.
-   **Processo de Cadastro de Clube**:
    1.  **Ação no Frontend**: O usuário preenche os campos do formulário (nome do clube, URL do escudo, etc.) no `add-club-modal.tsx`.
    2.  **Chamada Frontend -> Backend**: Ao submeter o formulário, uma requisição `POST` é enviada para o endpoint de criação de clubes no backend (e.g., `/clubs/`).
    3.  **Processamento no Backend**: O backend (`backend/fastapi_core/app/app.py` e `backend/fastapi_core/app/crud.py`) recebe os dados, valida-os e os persiste no banco de dados `app.db` (via `backend/fastapi_core/app/models.py`).
    4.  **Resposta Backend -> Frontend**: O backend retorna o objeto do clube recém-criado ou uma mensagem de erro.
    5.  **Ações no Frontend**: O modal é fechado e a lista de clubes é atualizada para exibir o novo clube.

### Filtragem de Clubes com Dados Raspados (Scraping)

A aplicação utiliza um processo de scraping para coletar dados detalhados de clubes e jogadores de fontes externas (como a ESPN). Esses dados são então integrados ao sistema para enriquecer as informações dos clubes e permitir filtragens avançadas.

#### Processo de Scraping (Visão Geral)

O scraping é realizado por scripts Python no backend, principalmente em `backend/fastapi_core/app/scraper_completo.py` e outros arquivos `scraper_*.py`.

1.  **Inicialização**: O processo de scraping é iniciado, geralmente por uma chamada de API ou um agendador de tarefas no backend.
2.  **Coleta de URLs**: O scraper identifica as URLs das páginas dos clubes ou jogadores a serem raspados.
3.  **Requisições HTTP**: Faz requisições HTTP para as URLs identificadas para obter o conteúdo HTML das páginas.
4.  **Parsing HTML**: Utiliza bibliotecas como `BeautifulSoup` ou `lxml` para analisar o HTML e extrair os dados relevantes (nome do jogador, posição, altura, peso, estatísticas, etc.).
5.  **Limpeza e Transformação**: Os dados brutos são limpos, padronizados e transformados para se adequarem ao esquema do banco de dados.
6.  **Persistência**: Os dados processados são inseridos ou atualizados no banco de dados `app.db` através das funções de CRUD do backend.

#### Ordem e Partes do Processo de Código (Exemplo com `scraper_completo.py`)

-   **`backend/fastapi_core/app/scraper_completo.py`**: Este arquivo provavelmente orquestra o processo completo de scraping.
    -   **Função `scrape_club_data(club_url)`**:
        -   Recebe a URL de um clube como entrada.
        -   Faz uma requisição `GET` para a URL.
        -   Usa seletores CSS ou XPath para extrair informações como nome do clube, escudo, informações do elenco.
        -   Pode chamar outras funções para raspar detalhes de cada jogador do elenco.
    -   **Função `scrape_player_data(player_url)`**:
        -   Recebe a URL de um jogador.
        -   Extrai detalhes como nome, posição, data de nascimento, altura, peso, número da camisa, etc.
        -   Pode lidar com diferentes estruturas de página para goleiros e jogadores de campo (como visto em `goleiros_altura_peso.csv`, `jogadores_campo_vasco_espn.csv`).
    -   **Integração com o Banco de Dados**: Após raspar os dados, o script interage com `backend/fastapi_core/app/crud.py` para criar ou atualizar registros de clubes e jogadores no `app.db`.

#### Filtragem no Frontend

-   A página `src/app/home/clubs/page.tsx` pode oferecer filtros que utilizam os dados raspados. Por exemplo, filtrar clubes por número de jogadores, média de idade do elenco, ou presença de jogadores com certas características (altura, peso, etc.).
-   Esses filtros geralmente enviam requisições `GET` para endpoints do backend (e.g., `/clubs/?min_players=X&max_age=Y`) que processam a lógica de filtragem com base nos dados armazenados no `app.db`.

### Importância para Documentação e Manutenção

-   **Entendimento do Fluxo**: A documentação detalhada do processo de scraping e gerenciamento de clubes é crucial para entender como os dados são populados e mantidos.
-   **Resolução de Problemas**: Em caso de alterações indevidas ou problemas com o scraping (e.g., mudança na estrutura do site da ESPN), esta documentação serve como um guia para identificar as partes do código que precisam ser ajustadas.
-   **Manutenção**: Facilita a manutenção e a evolução do módulo, permitindo que novos desenvolvedores compreendam rapidamente a lógica e as dependências.
-   **Consistência de Dados**: Ajuda a garantir a consistência dos dados entre o que é raspado e o que é exibido na aplicação.
