export interface UserNotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
}

export interface UserAlertPreferences {
  defaultPercentages: {
    buy: number
    sell: number
  }
}

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

export interface UserAlert {
  id: string
  symbol: string
  targetPrice: number
  type: 'above' | 'below'
  isActive: boolean
  createdAt: Date
  expiresAt?: Date
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  notifications: UserNotificationSettings
  alertPreferences: UserAlertPreferences
  language: 'pt-BR' | 'en-US'
}

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
