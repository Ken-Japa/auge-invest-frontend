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
├── app/ # Páginas Next.js
│ ├── (auth)/ # Páginas para usuários autenticados
│ ├── visitante/ # Páginas para visitantes
│ ├── blog/ # Páginas do blog
│ ├── login/ # Página de login
│ └── register/ # Página de registro
├── components/ # Componentes reutilizáveis
├── content/ # Conteúdo estático (blog)
├── pageComponents/ # Componentes específicos de página
│ ├── Logado/ # Componentes para usuários autenticados
│ └── Não-Logado/ # Componentes para visitantes
├── providers/ # Provedores React
├── services/ # Serviços de API
├── theme/ # Configuração de tema
├── types/ # Definições de tipos TypeScript
└── utils/ # Funções utilitárias

### Decisões de Arquitetura

- **Next.js**: Escolhido por sua capacidade de renderização no lado do servidor (SSR) e geração de site estático (SSG), o que melhora a performance, SEO e experiência do desenvolvedor. Facilita a criação de APIs e o roteamento baseado em arquivos.
- **TypeScript**: Adotado para garantir maior segurança de tipo, facilitar a manutenção do código e melhorar a colaboração em equipe, prevenindo erros comuns de JavaScript em tempo de desenvolvimento.
- **Estrutura Modular**: A organização do projeto em módulos (app, components, services, utils, etc.) promove a separação de responsabilidades, reusabilidade de código e escalabilidade. Isso permite que novas funcionalidades sejam adicionadas com impacto mínimo nas existentes.
- **Material UI e Tailwind CSS**: A combinação dessas bibliotecas oferece o melhor dos dois mundos: componentes UI prontos e acessíveis do Material UI, e a flexibilidade e velocidade de desenvolvimento do Tailwind CSS para estilos personalizados e responsivos.
- **Zustand e React Query**: Utilizados para gerenciamento de estado global e de servidor, respectivamente. Zustand é leve e performático para estado de UI, enquanto React Query otimiza a busca, cache e sincronização de dados com o backend, melhorando a experiência do usuário e a performance da aplicação.

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

### Padrões de Design

- **Componentes Reutilizáveis**: Priorizar a criação de componentes pequenos, focados e reutilizáveis. Isso promove a consistência da UI, reduz a duplicação de código e facilita a manutenção.
- **Atomic Design**: Embora não seja estritamente seguido, a filosofia do Atomic Design (Átomos, Moléculas, Organismos, Templates, Páginas) pode ser uma boa referência para estruturar componentes, especialmente em projetos maiores.
- **Injeção de Dependência (via Hooks)**: Utilizar hooks personalizados para injetar dependências (como serviços de API ou contextos) em componentes, mantendo-os mais limpos e testáveis.
- **Separação de Preocupações**: Garantir que cada módulo, componente ou função tenha uma única responsabilidade bem definida. Por exemplo, componentes devem focar na UI, enquanto serviços devem lidar com a lógica de negócio e comunicação com a API.

### Padrões de Documentação

#### Comentários de Código (JSDoc)
Todas as funções, componentes React, classes e métodos devem ser documentados usando JSDoc.
- Incluir `@param` para cada parâmetro, descrevendo seu tipo e propósito.
- Incluir `@returns` para descrever o valor de retorno da função.
- Incluir `@typedef` para tipos complexos ou interfaces.

Exemplo:
```typescript
/**
 * Calcula a soma de dois números.
 * @param {number} a - O primeiro número.
 * @param {number} b - O segundo número.
 * @returns {number} A soma de 'a' e 'b'.
 */
function sum(a: number, b: number): number {
  return a + b;
}
```

#### Formatação de Arquivos Markdown
- **Títulos:** Usar `#` para o título principal, `##` para seções, `###` para subseções, e assim por diante.
- **Listas:** Usar `-` ou `*` para listas não ordenadas e `1.`, `2.` para listas ordenadas.
- **Blocos de Código:** Usar três crases (```) para blocos de código, especificando a linguagem (ex: ```typescript, ```json, ```bash).
- **Negrito e Itálico:** Usar `**texto**` para negrito e `*texto*` para itálico.
- **Links:** Usar `[texto do link](url)` para links.
- **Imagens:** Usar `![texto alternativo](url da imagem)` para imagens.
- **Consistência:** Manter um estilo consistente em todos os arquivos Markdown.

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

### Performance

- **Otimização de Imagens**: Utilizar o componente `next/image` para otimização automática de imagens, incluindo lazy loading e redimensionamento.
- **Memoização**: Em componentes de alta performance, usar `React.memo`, `useCallback` e `useMemo` para evitar re-renderizações desnecessárias.
- **Lazy Loading**: Implementar lazy loading para componentes e rotas que não são essenciais no carregamento inicial, utilizando `React.lazy` e `Suspense`.

### Acessibilidade

- **Semântica HTML**: Utilizar tags HTML semânticas para melhorar a estrutura e a compreensão por tecnologias assistivas.
- **Atributos ARIA**: Garantir que todos os elementos interativos tenham rótulos (`aria-label`) e estados (`aria-expanded`, `aria-pressed`) apropriados.
- **Navegação por Teclado**: Testar e garantir que toda a aplicação seja navegável e funcional usando apenas o teclado.

### Segurança

- **Validação de Entrada**: Validar e sanitizar todas as entradas de usuário no frontend para prevenir ataques como XSS (Cross-Site Scripting).
- **Proteção de Rotas**: Assegurar que as rotas de API e páginas sensíveis sejam protegidas com autenticação e autorização adequadas.
- **Variáveis de Ambiente**: Evitar a exposição de informações sensíveis (chaves de API, segredos) no código do frontend. Utilizar variáveis de ambiente e garantir que elas sejam carregadas de forma segura.
