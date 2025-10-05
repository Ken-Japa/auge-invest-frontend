/**
 * @interface UserNotificationSettings
 * @property {boolean} email - Indica se as notificações por e-mail estão ativadas.
 * @property {boolean} push - Indica se as notificações push estão ativadas.
 * @property {boolean} sms - Indica se as notificações por SMS estão ativadas.
 */
export interface UserNotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
}

/**
 * @interface UserAlertPreferences
 * @property {object} defaultPercentages - Percentagens padrão para alertas de compra e venda.
 * @property {number} defaultPercentages.buy - Percentagem padrão para alertas de compra.
 * @property {number} defaultPercentages.sell - Percentagem padrão para alertas de venda.
 */
export interface UserAlertPreferences {
  defaultPercentages: {
    buy: number
    sell: number
  }
}

/**
 * @interface UserPosition
 * @property {string} id - ID da posição.
 * @property {string} symbol - Símbolo do ativo.
 * @property {number} quantity - Quantidade do ativo.
 * @property {number} averagePrice - Preço médio de compra/venda.
 * @property {number} currentPrice - Preço atual do ativo.
 * @property {'real' | 'simulated'} type - Tipo da posição (real ou simulada).
 * @property {Date} createdAt - Data de criação da posição.
 * @property {Date} updatedAt - Data da última atualização da posição.
 */
export interface UserPosition {
  id: string
  symbol: string
  quantity: number
  averagePrice: number
  currentPrice: number
  type: 'real' | 'simulated'
  createdAt: Date
  updatedAt: Date
}

/**
 * @interface UserAlert
 * @property {string} id - ID do alerta.
 * @property {string} symbol - Símbolo do ativo para o alerta.
 * @property {number} targetPrice - Preço alvo para o alerta.
 * @property {'above' | ''below'} type - Tipo do alerta (acima ou abaixo do preço alvo).
 * @property {boolean} isActive - Indica se o alerta está ativo.
 * @property {Date} createdAt - Data de criação do alerta.
 * @property {Date} [expiresAt] - Data de expiração do alerta (opcional).
 */
export interface UserAlert {
  id: string
  symbol: string
  targetPrice: number
  type: 'above' | 'below'
  isActive: boolean
  createdAt: Date
  expiresAt?: Date
}

/**
 * @interface UserSettings
 * @property {'light' | 'dark' | 'system'} theme - Tema da aplicação (claro, escuro ou sistema).
 * @property {UserNotificationSettings} notifications - Configurações de notificação do usuário.
 * @property {UserAlertPreferences} alertPreferences - Preferências de alerta do usuário.
 * @property {'pt-BR' | 'en-US'} language - Idioma da aplicação.
 */
export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  notifications: UserNotificationSettings
  alertPreferences: UserAlertPreferences
  language: 'pt-BR' | 'en-US'
}

/**
 * @interface User
 * @property {string} id - ID único do usuário.
 * @property {string} name - Nome completo do usuário.
 * @property {string} email - Endereço de e-mail do usuário.
 * @property {Date} [emailVerified] - Data de verificação do e-mail (opcional).
 * @property {string} [phone] - Número de telefone do usuário (opcional).
 * @property {string} cpf - CPF do usuário.
 * @property {string} [image] - URL da imagem de perfil do usuário (opcional).
 * @property {Date} createdAt - Data de criação da conta do usuário.
 * @property {Date} updatedAt - Data da última atualização dos dados do usuário.
 * @property {Date} [lastLogin] - Data do último login do usuário (opcional).
 * @property {boolean} isActive - Indica se a conta do usuário está ativa.
 * @property {UserSettings} settings - Configurações do usuário.
 * @property {UserPosition[]} positions - Lista de posições de ativos do usuário.
 * @property {UserAlert[]} alerts - Lista de alertas de preços do usuário.
 * @property {object} preferences - Preferências do usuário.
 * @property {'visao-economia' | 'dashboard'} preferences.defaultDashboard - Dashboard padrão do usuário.
 * @property {'real' | 'simulated'} preferences.defaultPositionType - Tipo de posição padrão do usuário.
 * @property {string} [token] - Token de autenticação do usuário (opcional, geralmente não persistido no frontend).
 */
export interface User {
  id: string
  name: string
  email: string
  emailVerified?: Date
  phone?: string
  cpf: string
  image?: string
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  isActive: boolean
  settings: UserSettings
  positions: UserPosition[]
  alerts: UserAlert[]
  preferences: {
    defaultDashboard: 'visao-economia' | 'dashboard'
    defaultPositionType: 'real' | 'simulated'
  }
  token?: string
}
