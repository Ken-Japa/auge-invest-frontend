# Melhorias do Projeto

Este documento lista as melhorias planejadas para o projeto, categorizadas por prioridade.

## Melhorias Concluídas

- **Implementação do Lighthouse CI**: Configuração e integração do Lighthouse CI no fluxo de trabalho de CI/CD para auditorias automatizadas de desempenho, acessibilidade, melhores práticas e SEO.
- **Implementação de atributos ARIA adequados para navegação e elementos interativos**: Adicionados atributos `aria-label`, `aria-haspopup`, `aria-expanded`, `role="menu"`, `role="menuitem"` e `aria-current` aos componentes `CustomButton`, `NavDropdown` e `NavLink` para melhorar a acessibilidade.
- **Gerenciamento de Foco**: Garantido que o foco do teclado seja gerenciado corretamente em modais, menus e outros componentes interativos, e implementado `focus traps` para modais e `skip links` para navegação.

## Melhorias Pendentes

### Alta Prioridade

- [ ] **Checklist de Otimização de Performance**: Desenvolver um checklist para otimização contínua de performance, cobrindo aspectos como carregamento de recursos, renderização e uso de cache.
- [ ] **Processo de Melhoria Contínua**: Estabelecer um processo para revisar regularmente o desempenho da aplicação, coletar feedback e implementar melhorias iterativas.
- [ ] **Base de Conhecimento**: Criar e manter uma base de conhecimento com documentação técnica, decisões de arquitetura e melhores práticas.
- [ ] **Otimização de Componentes**: Otimizar a renderização de componentes React, utilizando `React.memo`, `useCallback` e `useMemo` para evitar re-renderizações desnecessárias.
- [ ] **Otimização de Acessibilidade**: Implementar testes automatizados de acessibilidade e auditorias regulares para garantir a conformidade com as diretrizes WCAG.
- [x] Identificar todas as imagens no projeto que precisam de otimização. (Utilizando `OptimizedImage` e `next/image`)
- [x] Implementar carregamento lento (lazy loading) para imagens fora da tela. (Gerenciado por `next/image`)
- [x] Otimizar o tamanho e o formato das imagens (ex: converter para WebP, ajustar compressão). (Gerenciado por `next/image`)
- [x] Garantir que todas as imagens tenham atributos `alt` descritivos.
- [x] Testar o desempenho da página após as otimizações de imagem.

### Média Prioridade

- **Otimização de Chamadas de API** (Ainda não implementado `optimizedApiService`):
    - [x] Implementar cache de dados para reduzir chamadas repetitivas.
    - [x] Otimizar queries e payloads de API para buscar apenas os dados necessários.

### Baixa Prioridade

- **Internacionalização (i18n)**:
    - [x] Implementar suporte para múltiplos idiomas na aplicação.
    - [x] Utilizar bibliotecas de i18n para gerenciar traduções.
- **Testes de Performance**:
    - [x] Configurar testes de performance automatizados para monitorar regressões.
    - [x] Utilizar ferramentas como WebPageTest ou PageSpeed Insights para análises regulares.

### Tarefas Futuras

- **Contraste de Cores**:
    - Auditar e ajustar as cores da interface para garantir um contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande e elementos gráficos, conforme as diretrizes WCAG.
