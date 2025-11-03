# Auge Invest

  
![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react)
![MUI](https://img.shields.io/badge/MUI-6.0-007FFF?style=for-the-badge&logo=mui)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)



## 📊 Visão Geral

Auge Invest é uma plataforma avançada de análise e acompanhamento do mercado financeiro brasileiro, desenvolvida para auxiliar investidores na tomada de decisões estratégicas. A plataforma combina visualização de dados em tempo real, análises fundamentalistas e técnicas, e ferramentas personalizadas para gerenciamento de carteiras.

## ✨ Funcionalidades Principais

- **Dashboard Econômico**: Visão macro da economia brasileira com indicadores-chave
- **Análise de Ativos**: Dados detalhados sobre Ações, FIIs, ETFs e BDRs
- **Gestão de Carteira**: Acompanhamento de posições e rentabilidade
- **Análise Fundamentalista**: Indicadores e métricas para avaliação de empresas
- **Sistema de Alertas**: Notificações personalizadas para oportunidades de compra/venda
- **Calendário Financeiro**: Eventos econômicos e distribuição de proventos
- **Blog Especializado**: Conteúdo educativo sobre investimentos e mercado financeiro

## 🛠️ Stack Tecnológica

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) com App Router
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **UI/UX**: 
  - [Material UI 6](https://mui.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Framer Motion](https://www.framer.com/motion/) para animações
  - [Emotion](https://emotion.sh/) para CSS-in-JS

### Gerenciamento de Estado
- **Global**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Server State**: [React Query](https://tanstack.com/query/latest)

### Visualização de Dados
- **Gráficos**: 
  - [Recharts](https://recharts.org/)
  - [Nivo](https://nivo.rocks/)
  - [D3.js](https://d3js.org/)
- **Redes e Grafos**: [vis-network](https://visjs.github.io/vis-network/docs/network/)

### Formulários e Validação
- **Gerenciamento**: [React Hook Form](https://react-hook-form.com/)
- **Validação**: [Zod](https://zod.dev/)

### Autenticação e Segurança
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **OAuth**: Integração com Google

### Ferramentas de Desenvolvimento
- **Linting**: ESLint com configurações personalizadas
- **Formatação**: Prettier
- **Testes**: Jest, Testing Library
- **Performance**: Lighthouse CI, Vercel Analytics

## 🏗️ Arquitetura do Projeto

```
src/
├── app/                # Páginas Next.js (App Router)
│   ├── (auth)/         # Rotas protegidas por autenticação
│   ├── visitante/      # Páginas públicas
│   ├── blog/           # Sistema de blog
│   └── api/            # Rotas de API
├── components/         # Componentes reutilizáveis
│   ├── Core/           # Componentes fundamentais
│   ├── Data-Display/   # Visualização de dados
│   ├── Effects/        # Animações e efeitos
│   ├── Feedback/       # Notificações e alertas
│   ├── Form/           # Componentes de formulário
│   └── Layout/         # Estruturas de layout
├── pagesComponents/    # Componentes específicos de página
├── content/            # Conteúdo estático (blog)
├── hooks/              # Custom hooks
├── providers/          # Contextos e providers
├── services/           # Serviços e APIs
├── store/              # Gerenciamento de estado global
├── theme/              # Configuração de tema
├── types/              # Definições de tipos TypeScript
└── utils/              # Funções utilitárias
```

## 🚀 Competências Demonstradas

- **Arquitetura Frontend Moderna**: Implementação de uma aplicação React com Next.js utilizando o novo App Router, demonstrando conhecimento avançado em arquitetura de software frontend.

- **UI/UX Avançado**: Desenvolvimento de interfaces responsivas e acessíveis com Material UI e Tailwind CSS, incluindo animações fluidas e transições com Framer Motion.

- **Visualização de Dados Complexos**: Criação de gráficos interativos e dashboards para visualização de dados financeiros utilizando bibliotecas como Recharts, Nivo e D3.js.

- **Gerenciamento de Estado**: Implementação de soluções eficientes para gerenciamento de estado global com Zustand e estado de servidor com React Query.

- **Autenticação e Segurança**: Implementação de sistema de autenticação seguro com NextAuth.js, incluindo integração com provedores OAuth.

- **Performance e Otimização**: Aplicação de técnicas avançadas de otimização para garantir carregamento rápido e experiência fluida, monitoradas através de Lighthouse CI.

- **Testes Automatizados**: Implementação de testes unitários e de integração com Jest e Testing Library para garantir a qualidade do código.

- **TypeScript Avançado**: Uso extensivo de TypeScript para tipagem estática, interfaces, tipos genéricos e utilitários de tipo.

## 📝 Como Executar o Projeto

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/auge-invest.git

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Iniciar em modo de produção
npm run start
```

## 📈 Roadmap

- **Em Desenvolvimento**:
  - Sistema de assinaturas e pagamentos
  - Alertas personalizados
  - Gestão avançada de carteira
  - Expansão da cobertura de ativos (ETFs, BDRs)

- **Próximas Etapas**:
  - Integração com IA para recomendações personalizadas
  - Análise de derivativos e opções
  - Cobertura de ativos internacionais
  - App mobile

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  <p>Desenvolvido com 💙 por Auge Invest</p>
</div>
