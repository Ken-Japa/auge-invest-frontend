# Visão Geral do Projeto

Este documento serve como uma visão geral do projeto `front-trae`, um aplicativo frontend desenvolvido com Next.js, focado em fornecer uma experiência de usuário robusta e interativa.

## Propósito

O principal propósito deste projeto é ser um aplicativo sobre o mercado financeiro brasileiro com intuito de ajudar o usuário a tomar suas decisões na hora de investir. Ele inclui funcionalidades de autenticação de usuário, gerenciamento de estado e uma interface de usuário moderna.

## Estrutura

O projeto segue uma estrutura modular e organizada, típica de aplicações Next.js e React, com as seguintes pastas principais:

- `src/app`: Contém as rotas e layouts principais da aplicação, incluindo rotas de autenticação (`(auth)`, `login`, `register`, `logout`) e páginas para usuários logados e visitantes.
- `src/components`: Armazena componentes React reutilizáveis, categorizados por funcionalidade (e.g., `Core`, `Data-Display`, `Form`, `Layout`, `shared`).
- `src/pagesComponents`: Contém componentes específicos de página, organizados por contexto (e.g., `Blog`, `Logado`, `Nao-Logado`).
- `src/hooks`: Define hooks personalizados para lógica reutilizável em componentes.
- `src/providers`: Gerencia o contexto global da aplicação, como autenticação (`AuthProvider`), API (`ApiProvider`) e temas.
- `src/services`: Contém a lógica para interações com APIs externas.
- `src/store`: Responsável pelo gerenciamento de estado da aplicação (e.g., `companyStore`).
- `src/theme`: Define a configuração de tema e estilos da aplicação, utilizando Material-UI.
- `src/types`: Contém definições de tipos TypeScript para garantir a segurança e consistência do código.
- `src/utils`: Funções utilitárias e helpers.
- `docs`: Contém a documentação do projeto, como esta visão geral e a documentação técnica e da API.

## Tecnologias Utilizadas

As principais tecnologias e frameworks utilizados neste projeto incluem:

- **Next.js**: Framework React para construção de aplicações web com renderização do lado do servidor (SSR) e geração de sites estáticos (SSG).
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Material-UI (MUI)**: Biblioteca de componentes React para um design de interface elegante e responsivo.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e consistente.
- **ESLint**: Ferramenta de linting para manter a qualidade e consistência do código.
- **Jest**: Framework de teste JavaScript para testes unitários e de integração.

## Como Contribuir

Para contribuir com este projeto, siga os passos abaixo:

1.  **Clone o repositório**: `git clone [URL_DO_REPOSITORIO]`
2.  **Instale as dependências**: `npm install` ou `yarn install`
3.  **Inicie o servidor de desenvolvimento**: `npm run dev` ou `yarn dev`
4.  **Crie uma nova branch**: `git checkout -b feature/minha-nova-feature`
5.  **Implemente suas alterações**: Certifique-se de seguir as convenções de código e as melhores práticas.
6.  **Execute os testes**: `npm test` ou `yarn test`
7.  **Crie um Pull Request**: Descreva suas alterações detalhadamente.

Para mais informações sobre as convenções de código e diretrizes de desenvolvimento, consulte a documentação técnica em <mcfile name="technical-documentation.md" path="c:\Users\Ken\Desktop\Programacao\Frontend\front-trae\docs\technical-documentation.md"></mcfile> e a documentação da API em <mcfile name="api-documentation.md" path="c:\Users\Ken\Desktop\Programacao\Frontend\front-trae\docs\api-documentation.md"></mcfile>.
