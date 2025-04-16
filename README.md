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
├── providers/              # Providers React
├── services/               # Serviços e APIs
├── theme/                  # Configuração de tema
├── types/                  # Definições de tipos TypeScript
└── utils/                  # Funções utilitárias
## Tarefas Prioritárias:

1. Conectar banco de usuários (registrar) - > Assinantes
2. Testar backend API fornecendo dados ao frontend

## Tarefas Futuras:

1. Dashboard de visão geral da economia
     (rede neural - sistema de card - listas - gráficos)
2. Página de ativos específicos (uma empresa em si, BDR) (ETF, ETF de BDR) (FII) - Dividendos
3. Posições de usuário (extra: adicionar rentabilidade em um gráfico x tempo)
4. Página para derivativos
5. Função para exibir histórico de derivativos
6. Alertas
7. Dados fundamentalistas
8. Selic, Inflacao, Moedas, Debentures, Commodities
9. Calendario Economico (widget) - Calendario Proventos (widget)

## Tarefas Finais:
1. Assinantes (modos de pagamento)
2. Período de Testes
3. Artigos Blog
4. Redes Sociais

## Componentes essenciais:
1. Gráficos
2. Cards
3. Calendário (utilização de um widget da TradingView)

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