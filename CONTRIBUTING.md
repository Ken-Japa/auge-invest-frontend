# Diretrizes de Contribuição

Bem-vindo(a) ao projeto `front-trae`! Agradecemos o seu interesse em contribuir. Para garantir um processo de colaboração suave e eficiente, por favor, siga estas diretrizes.

## Como Contribuir

1.  **Faça um Fork do Repositório**: Comece fazendo um fork do repositório principal para a sua conta GitHub.
2.  **Clone o Repositório**: Clone o seu fork para a sua máquina local:
    ```bash
    git clone [URL_DO_SEU_FORK]
    cd front-trae
    ```
3.  **Instale as Dependências**: Certifique-se de ter todas as dependências instaladas:
    ```bash
    npm install
    # ou
    yarn install
    ```
4.  **Crie uma Nova Branch**: Crie uma branch para a sua feature ou correção de bug. Use nomes descritivos, como `feature/nome-da-feature` ou `bugfix/descricao-do-bug`.
    ```bash
    git checkout -b feature/minha-nova-feature
    ```
5.  **Implemente suas Alterações**: Faça as alterações necessárias no código. Certifique-se de seguir o estilo de código e as melhores práticas do projeto.
6.  **Execute os Testes**: Antes de submeter suas alterações, execute os testes para garantir que nada foi quebrado e que suas novas funcionalidades estão funcionando corretamente.
    ```bash
    npm test
    # ou
    yarn test
    ```
7.  **Faça o Commit das Suas Alterações**: Escreva mensagens de commit claras e concisas. Consulte a seção "Mensagens de Commit" abaixo.
    ```bash
    git commit -m "feat: adiciona nova funcionalidade X"
    ```
8.  **Envie para o Seu Fork**: Envie suas alterações para o seu repositório fork no GitHub.
    ```bash
    git push origin feature/minha-nova-feature
    ```
9.  **Abra um Pull Request (PR)**: Vá para o repositório original no GitHub e abra um Pull Request da sua branch para a branch `main` (ou a branch de desenvolvimento apropriada). Descreva suas alterações em detalhes no PR.

## Estilo de Código

Este projeto utiliza ESLint e Prettier para manter a consistência do código. Certifique-se de que seu código esteja formatado corretamente antes de fazer o commit. Você pode executar:

```bash
npm run lint
npm run format
```

## Mensagens de Commit

Por favor, siga a convenção de mensagens de commit [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Isso ajuda a manter um histórico de commits limpo e facilita a geração automática de changelogs.

Exemplos:

- `feat: adiciona funcionalidade de login de usuário`
- `fix: corrige bug de exibição na página inicial`
- `docs: atualiza documentação de contribuição`
- `refactor: refatora componente de botão`

## Executando Testes

Os testes são escritos usando Jest. Para executar todos os testes, use:

```bash
npm test
# ou
yarn test
```

## Reportando Bugs

Se você encontrar um bug, por favor, abra uma issue no GitHub, fornecendo o máximo de detalhes possível, incluindo passos para reproduzir o problema, comportamento esperado e comportamento atual.

## Sugerindo Novas Funcionalidades

Para sugerir uma nova funcionalidade, abra uma issue no GitHub para discutir a ideia antes de começar a trabalhar nela. Isso ajuda a garantir que a funcionalidade esteja alinhada com a visão do projeto.
