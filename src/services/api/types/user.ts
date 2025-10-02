// User related types
export interface User {
  _id?: string
  name?: string
  email?: string
  password?: string
  googleId?: string
  picture?: string
  createdAt?: string
  updatedAt?: string
  phone?: string
  cpf?: string
  isActive?: boolean
  preferences?: {
    defaultDashboard?: string
    defaultPositionType?: 'real' | 'simulated'
    notifications?: boolean
    theme?: 'light' | 'dark'
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}
