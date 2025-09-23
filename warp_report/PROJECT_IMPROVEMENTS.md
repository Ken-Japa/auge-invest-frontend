# Project Improvements

## Completed Improvements:

- **Implementação do Lighthouse CI:** Configurado para monitoramento contínuo de performance e acessibilidade no CI/CD, incluindo a criação do arquivo `.lighthouserc.json`, adição de scripts ao `package.json` e configuração do workflow do GitHub Actions. O `LHCI_GITHUB_APP_TOKEN` foi configurado como um segredo no repositório.

## Pending Improvements:

### Alta Prioridade:

- Implementar atributos ARIA adequados para navegação e elementos interativos.
- Adicionar gerenciamento de foco para botões personalizados e componentes modais/drawer.
- Corrigir problemas de contraste de cores no `tailwind.config.ts` para atender aos requisitos WCAG.
- Adicionar texto alternativo (alt text) e rótulos ARIA para imagens e elementos interativos.

### Média Prioridade:

- Otimizar chamadas de API com cache, deduplicação de requisições e tamanhos de página menores.
- Implementar otimização de imagens usando `next/image` e formatos WebP/AVIF.
- Corrigir problemas de SSR (Server-Side Rendering) relacionados a 'self is not defined' usando 'use client' ou dynamic imports.
- Implementar code splitting e lazy loading para reduzir o tamanho do bundle.

### Baixa Prioridade:

- Otimizar fontes e ícones para melhorar o tempo de carregamento.
- Implementar Service Workers para caching avançado.
- Remover dependências duplicadas para redução do tamanho do bundle.
- Configurar testes de acessibilidade automatizados no CI/CD.
- Monitorar e iterar sobre as melhorias de performance e acessibilidade ao longo do tempo.