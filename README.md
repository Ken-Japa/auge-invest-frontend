# Auge Invest

Plataforma de análise e acompanhamento do mercado financeiro brasileiro, projetada para auxiliar investidores na tomada de decisões.

## Sobre o Projeto

Auge Invest oferece ferramentas e análises para investidores acompanharem o mercado financeiro brasileiro, incluindo:

- Visão geral da economia brasileira
- Análise detalhada de ativos (Ações, FIIs, ETFs, BDRs)
- Acompanhamento de posições e rentabilidade
- Análise fundamentalista
- Alertas de compra e venda
- Calendário econômico e de proventos

## Tecnologias Utilizadas

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Material UI
- **Gerenciamento de Estado**: Zustand, React Query
- **Visualização de Dados**: D3, Recharts, Nivo
- **Formulários**: React Hook Form, Zod
- **Autenticação**: NextAuth.js
- **Outros**: Axios, Framer Motion, Day.js, Date-fns

## Estrutura do Projeto

src/
├── app/ # Páginas Next.js
│ ├── (auth)/ # Páginas para usuários autenticados
│ ├── visitante/ # Páginas para visitantes
│ ├── blog/ # Blog e artigos
│ ├── login/ # Página de login
│ └── register/ # Página de registro
├── components/ # Componentes reutilizáveis
├── content/ # Conteúdo estático (artigos-blog)
├── pageComponents/ # Componentes específicos de página
│ ├── Logado/ # Componentes para usuários logados
│ └── Não-Logado/ # Componentes para visitantes
│ └── Blog/ # Lógica páginas do Blog  
├── providers/ # Providers React
├── services/ # APIs
├── theme/ # Configuração de tema
├── types/ # Definições de tipos TypeScript
└── utils/ # Funções utilitárias

## Tarefas Prioritárias BACKEND:

1. Assinantes (modos de pagamento) - Período de Testes
2. Possibilitar a criação de alertas
3. Cadastro de Posição - Carteira
4. Cadastrar Favoritos
5. APIs para ETF, ETD de BDR, BDR

## Tarefas Prioritárias FRONTEND:

1. Página de ativos específicos (ETF, ETF de BDR, BDR) (FII preços)
2. Posições de usuário
3. Favoritos
4. Alertas
5. Assinatura (modos de pagamento)
6. Dashboard de visão geral da economia (ir adicionando a medida que for feito os ativos individuais) (favoritos)

## Tarefas Finais:

1. Atualizar backend
2. Configurar atualização automática do backend
3. Melhorar estilo geral do frontend
4. Resolver problemas identificados - Trello
5. Revisar todos os componentes criados, identificar problemas e melhorias
6. Redes Sociais
7. Campanhas de Marketing

## Tarefas Futuras:

1. Selic, Inflacao
2. Moedas, Debentures, Commodities
3. Tesouro Direto
4. Posições em aberto (derivativos)
5. IA chatbot

## Tarefas Feitas

1. Páginas para visitantes
2. Login e Registrar
3. Analise fundamentalista
4. Perfil e configurações usuário
5. Empresas Geral
6. Empresas Individual (dividendos - derivativos - analise preços)
7. FII (problema com preços)
8. Visão economia (parcial)
9. Blog

10. APIs (auth, user, empresa, historico empresa, derivativos, fii)
11. Tema

## MUI material

https://mui.com/

Docs:

1. Overview - https://mui.com/material-ui/getting-started/
2. BaseUI - https://mui.com/base-ui/getting-started/
3. JoyUI - https://mui.com/joy-ui/getting-started/
4. MUI System - https://mui.com/system/getting-started/
5. Data Grid / Date Picker / Charts / TreeView - https://mui.com/x/react-data-grid/

## Instalação e Execução

Para configurar e executar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node.js) ou Yarn

### Configuração do Ambiente

1.  **Clone o Repositório:**

    ```bash
    git clone https://github.com/seu-usuario/auge-invest.git
    cd auge-invest
    ```

2.  **Instale as Dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis de ambiente. Você pode usar o arquivo `.env.example` como base.

    ```
    # Exemplo de variáveis de ambiente
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=SEGREDO_MUITO_SEGURO_E_LONGO
    # Adicione outras variáveis de ambiente necessárias para APIs externas, banco de dados, etc.
    # EX: API_BASE_URL=http://localhost:8080/api
    ```

    Certifique-se de que `NEXTAUTH_SECRET` seja uma string longa e aleatória para segurança.

### Execução do Projeto

1.  **Modo de Desenvolvimento:**
    Para iniciar o servidor de desenvolvimento com hot-reloading:

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

    O aplicativo estará disponível em `http://localhost:3000`.

2.  **Construção para Produção:**
    Para compilar o projeto para produção:

    ```bash
    npm run build
    # ou
    yarn build
    ```

    Isso criará uma pasta `.next` com os arquivos otimizados para deploy.

3.  **Modo de Produção (Local):**
    Após a construção, você pode iniciar o aplicativo em modo de produção localmente:
    ```bash
    npm run start
    # ou
    yarn start
    ```
    O aplicativo estará disponível em `http://localhost:3000`.

## Deploy

Este projeto é um aplicativo Next.js e pode ser facilmente implantado em plataformas como Vercel, Netlify ou em um servidor Node.js customizado.

### Deploy na Vercel

Se você estiver usando a Vercel, basta conectar seu repositório GitHub. A Vercel detectará automaticamente que é um projeto Next.js e configurará o deploy. Certifique-se de adicionar suas variáveis de ambiente no painel da Vercel.

### Deploy em Outras Plataformas

Para outras plataformas, como Netlify ou um servidor Node.js:

1.  **Construa o Projeto:**
    ```bash
    npm run build
    ```
2.  **Configure o Servidor:**
    Configure seu servidor para servir os arquivos estáticos da pasta `public` e iniciar o servidor Next.js usando `npm run start`.

Para mais detalhes sobre deploy do Next.js, consulte a [documentação oficial do Next.js](https://nextjs.org/docs/deployment).
