# Documentação da API - Auge Invest

## Sumário

- [Autenticação](#autenticação)
- [Ativos](#ativos)
- [Posições do Usuário](#posições-do-usuário)
- [Alertas](#alertas)
- [Dados Econômicos](#dados-econômicos)

## Autenticação

### Login

**Endpoint:** `/api/auth/login`
**Método:** `POST`
**Descrição:** Autentica um usuário e retorna um token JWT

**Corpo da Requisição:**

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta de Sucesso:**

```json
{
  "user": {
    "id": "123",
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com"
  },
  "token": "jwt-token"
}
```

**Códigos de Status:**

- 200 OK - Autenticação bem-sucedida
- 401 Unauthorized - Credenciais inválidas
- 500 Internal Server Error - Erro no servidor

### Registro

**Endpoint:** `/api/auth/register`
**Método:** `POST`
**Descrição:** Registra um novo usuário

**Corpo da Requisição:**

```json
{
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta de Sucesso:**

```json
{
  "user": {
    "id": "123",
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com"
  },
  "token": "jwt-token"
}
```

**Códigos de Status:**

- 201 Created - Usuário criado com sucesso
- 400 Bad Request - Dados inválidos
- 409 Conflict - Email já registrado
- 500 Internal Server Error - Erro no servidor

## Ativos

### Listar Todos os Ativos

**Endpoint:** `/api/assets`
**Método:** `GET`
**Descrição:** Retorna uma lista paginada de ativos

**Parâmetros de Consulta:**

- `type` (opcional): Filtrar por tipo de ativo (stocks, fiis, etc.)
- `search` (opcional): Termo de busca para nome ou símbolo do ativo
- `page` (opcional): Número da página para paginação (padrão: 1)
- `limit` (opcional): Número de itens por página (padrão: 10)

**Resposta de Sucesso:**

```json
{
  "data": [
    {
      "id": "1",
      "symbol": "PETR4",
      "name": "Petrobras PN",
      "type": "stocks",
      "price": 28.75
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

**Códigos de Status:**

- 200 OK - Requisição bem-sucedida
- 400 Bad Request - Parâmetros inválidos
- 500 Internal Server Error - Erro no servidor

### Obter Detalhes do Ativo

**Endpoint:** `/api/assets/:symbol`
**Método:** `GET`
**Descrição:** Retorna informações detalhadas sobre um ativo específico

**Parâmetros de URL:**

- `symbol`: Símbolo do ativo (ex: PETR4)

**Resposta de Sucesso:**

```json
{
  "id": "1",
  "symbol": "PETR4",
  "name": "Petrobras PN",
  "type": "stocks",
  "price": 28.75,
  "change": 1.25,
  "changePercent": 4.55,
  "fundamentals": {
    "pe": 5.2,
    "dy": 12.5,
    "marketCap": 375000000000
  }
}
```

**Códigos de Status:**

- 200 OK - Requisição bem-sucedida
- 404 Not Found - Ativo não encontrado
- 500 Internal Server Error - Erro no servidor

## Posições do Usuário

### Listar Posições

**Endpoint:** `/api/positions`
**Método:** `GET`
**Descrição:** Retorna as posições de investimento do usuário

**Cabeçalhos Necessários:**

- `Authorization: Bearer {token}`

**Resposta de Sucesso:**

```json
{
  "data": [
    {
      "id": "1",
      "name": "Minha Carteira",
      "assets": [
        {
          "id": "101",
          "symbol": "PETR4",
          "quantity": 100,
          "price": 25.75,
          "currentPrice": 28.75,
          "profit": 300.0,
          "profitPercent": 11.65
        }
      ],
      "totalInvested": 5855.0,
      "currentValue": 6311.0,
      "totalProfit": 456.0,
      "totalProfitPercent": 7.79
    }
  ]
}
```

**Códigos de Status:**

- 200 OK - Requisição bem-sucedida
- 401 Unauthorized - Não autenticado
- 500 Internal Server Error - Erro no servidor

### Criar Nova Posição

**Endpoint:** `/api/positions`
**Método:** `POST`
**Descrição:** Cria uma nova posição de investimento

**Cabeçalhos Necessários:**

- `Authorization: Bearer {token}`

**Corpo da Requisição:**

```json
{
  "name": "Nova Carteira",
  "description": "Carteira de longo prazo"
}
```

**Resposta de Sucesso:**

```json
{
  "id": "2",
  "name": "Nova Carteira",
  "description": "Carteira de longo prazo",
  "assets": [],
  "totalInvested": 0,
  "currentValue": 0,
  "totalProfit": 0,
  "totalProfitPercent": 0
}
```

**Códigos de Status:**

- 201 Created - Posição criada com sucesso
- 400 Bad Request - Dados inválidos
- 401 Unauthorized - Não autenticado
- 500 Internal Server Error - Erro no servidor

## Alertas

### Listar Alertas

**Endpoint:** `/api/alerts`
**Método:** `GET`
**Descrição:** Retorna os alertas configurados pelo usuário

**Cabeçalhos Necessários:**

- `Authorization: Bearer {token}`

**Resposta de Sucesso:**

```json
{
  "data": [
    {
      "id": "1",
      "symbol": "PETR4",
      "type": "price",
      "condition": "above",
      "value": 30.0,
      "active": true,
      "createdAt": "2023-01-20T00:00:00Z"
    }
  ]
}
```

**Códigos de Status:**

- 200 OK - Requisição bem-sucedida
- 401 Unauthorized - Não autenticado
- 500 Internal Server Error - Erro no servidor

### Criar Alerta

**Endpoint:** `/api/alerts`
**Método:** `POST`
**Descrição:** Cria um novo alerta

**Cabeçalhos Necessários:**

- `Authorization: Bearer {token}`

**Corpo da Requisição:**

```json
{
  "symbol": "VALE3",
  "type": "price",
  "condition": "below",
  "value": 65.0
}
```

**Resposta de Sucesso:**

```json
{
  "id": "3",
  "symbol": "VALE3",
  "type": "price",
  "condition": "below",
  "value": 65.0,
  "active": true,
  "createdAt": "2023-03-01T00:00:00Z"
}
```

**Códigos de Status:**

- 201 Created - Alerta criado com sucesso
- 400 Bad Request - Dados inválidos
- 401 Unauthorized - Não autenticado
- 500 Internal Server Error - Erro no servidor

## Dados Econômicos

### Obter Indicadores

**Endpoint:** `/api/economic/indicators`
**Método:** `GET`
**Descrição:** Retorna os principais indicadores econômicos

**Resposta de Sucesso:**

```json
{
  "data": {
    "selic": 13.75,
    "ipca": 5.79,
    "igpm": 6.52,
    "dolar": 5.17,
    "euro": 5.58,
    "ibovespa": 118500,
    "lastUpdate": "2023-03-01T00:00:00Z"
  }
}
```

**Códigos de Status:**

- 200 OK - Requisição bem-sucedida
- 500 Internal Server Error - Erro no servidor
