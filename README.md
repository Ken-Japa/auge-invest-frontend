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
├── app/                    # Páginas Next.js
│   ├── (auth)/             # Páginas para usuários autenticados
│   ├── visitante/          # Páginas para visitantes
│   ├── blog/               # Blog e artigos
│   ├── login/              # Página de login
│   └── register/           # Página de registro
├── components/             # Componentes reutilizáveis
├── content/                # Conteúdo estático (artigos-blog)
├── pageComponents/         # Componentes específicos de página
│   ├── Logado/             # Componentes para usuários logados
│   └── Não-Logado/         # Componentes para visitantes
│   └── Blog/               # Lógica páginas do Blog   
├── providers/              # Providers React
├── services/               # APIs
├── theme/                  # Configuração de tema
├── types/                  # Definições de tipos TypeScript
└── utils/                  # Funções utilitárias

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

1. APIs (auth, user, empresa, historico empresa, derivativos, fii)
2. Tema


## MUI material
https://mui.com/

Docs:
1. Overview - https://mui.com/material-ui/getting-started/
2. BaseUI - https://mui.com/base-ui/getting-started/
3. JoyUI - https://mui.com/joy-ui/getting-started/
4. MUI System - https://mui.com/system/getting-started/
5. Data Grid / Date Picker / Charts / TreeView - https://mui.com/x/react-data-grid/

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em ambiente de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Iniciar em modo de produção
npm run start