# Auge Invest - Documentação Técnica

## Visão Geral do Projeto
Auge Invest é uma plataforma financeira projetada para ajudar investidores brasileiros a tomarem decisões informadas, fornecendo ferramentas abrangentes de análise de mercado, acompanhamento de ativos e insights financeiros.

## Arquitetura

### Estrutura do Frontend
- **Framework**: Next.js com TypeScript
- **Bibliotecas UI**: Material UI, Tailwind CSS
- **Gerenciamento de Estado**: Zustand, React Query
- **Visualização de Dados**: D3, Recharts, Nivo

### Estrutura de Diretórios
src/
├── app/                    # Páginas Next.js
│   ├── (auth)/             # Páginas para usuários autenticados
│   ├── visitante/          # Páginas para visitantes
│   ├── blog/               # Páginas do blog
│   ├── login/              # Página de login
│   └── register/           # Página de registro
├── components/             # Componentes reutilizáveis
├── content/                # Conteúdo estático (blog)
├── pageComponents/         # Componentes específicos de página
│   ├── Logado/             # Componentes para usuários autenticados
│   └── Não-Logado/         # Componentes para visitantes
├── providers/              # Provedores React
├── services/               # Serviços de API
├── theme/                  # Configuração de tema
├── types/                  # Definições de tipos TypeScript
└── utils/                  # Funções utilitárias


## Componentes Principais

### Autenticação
A aplicação utiliza NextAuth.js para autenticação, com gerenciamento de sessão configurado em `src/providers/AuthProvider.tsx` e rotas de API em `src/app/api/auth/[...nextauth]/route.ts`.

### Manipulação de Datas
A aplicação utiliza dayjs para manipulação de datas com componentes MUI e date-fns para outras operações de data.

### Integração com API
Os serviços de API são centralizados em `src/services/` com uma configuração global de API para comunicação com o backend.

## Funcionalidades Principais

### Dashboard
O dashboard fornece uma visão abrangente dos investimentos do usuário e das condições de mercado.

### Páginas de Ativos
Páginas individuais de ativos exibem informações detalhadas sobre ativos específicos (ações, FIIs, etc.), incluindo:
- Dados históricos de preço
- Métricas fundamentalistas
- Histórico de dividendos
- Derivativos relacionados

### Acompanhamento de Posições
Os usuários podem acompanhar suas posições de investimento com:
- Posições reais e simuladas
- Acompanhamento de desempenho ao longo do tempo
- Alertas de compra/venda

### Análise Fundamentalista
Ferramentas para análise fundamentalista de ativos com base em dados fornecidos pelo usuário.

## Documentação da API

### API de Usuário
- `GET /api/user` - Obter informações do usuário atual
- `POST /api/user` - Atualizar informações do usuário

### API de Ativos
- `GET /api/assets` - Obter lista de ativos
- `GET /api/assets/:symbol` - Obter informações detalhadas sobre um ativo específico
- `GET /api/assets/:symbol/history` - Obter histórico de preços de um ativo
- `GET /api/assets/:symbol/derivatives` - Obter derivativos de um ativo

### API de Posições
- `GET /api/positions` - Obter posições do usuário
- `POST /api/positions` - Criar uma nova posição
- `PUT /api/positions/:id` - Atualizar uma posição
- `DELETE /api/positions/:id` - Excluir uma posição


### Gráficos
Vários componentes de gráficos estão disponíveis em src/components/charts/ para diferentes necessidades de visualização.

## Diretrizes de Desenvolvimento
### Gerenciamento de Estado
- Use Zustand para gerenciamento de estado global
- Use React Query para estado do servidor e busca de dados
- Use useState e useReducer do React para estado em nível de componente
### Estilização
- Use componentes MUI como biblioteca UI principal
- Use Tailwind CSS para estilização personalizada e layout
- A personalização de tema é tratada em src/theme/
### Tratamento de Erros
- Erros de API devem ser tratados usando blocos try/catch
- Use error boundaries para tratamento de erros em nível de componente
- Exiba mensagens de erro amigáveis usando notistack
## Implantação
A aplicação é implantada na Vercel com um domínio personalizado em augeinvest.com.