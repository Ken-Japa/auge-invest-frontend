export interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string | null
  cpf?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  avatar?: string
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
    defaultDashboard?: string
    defaultPositionType?: 'real' | 'simulated'
  }
}

export interface SubscriptionDetails {
  id: string
  planId: string
  planName: string
  status: 'active' | 'inactive' | 'pending'
  startDate: string
  nextBillingDate: string
  paymentMethod: {
    type: string
    lastFour?: string
  }
}

export type ProfileField = 'name' | 'email' | 'phone'
