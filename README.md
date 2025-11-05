# CBF Manager - Frontend

Este é o frontend do CBF Manager, uma aplicação Next.js para gerenciamento de operações da Confederação Brasileira de Futebol.

## Tecnologias

- **Next.js 15** - Framework React com renderização híbrida
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de estilização
- **Radix UI** - Componentes acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de dados
- **Recharts** - Gráficos e visualizações

## Instalação

```bash
npm install
```

## Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:9002`

## Build para Produção

```bash
npm run build
npm start
```

## Estrutura do Projeto

- `src/app/` - Páginas e rotas da aplicação
- `src/components/` - Componentes reutilizáveis
- `src/lib/` - Utilitários e configurações
- `src/context/` - Contextos React
- `src/hooks/` - Hooks customizados

## Credenciais Padrão

- **Email:** admin@cbfmanager.com
- **Senha:** admin123

Para começar, veja o arquivo `src/app/page.tsx`.
