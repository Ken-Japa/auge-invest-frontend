import { apiClient } from '@/services/api'
import { userApi } from '@/services/api/endpoints/users'
import { ApiSuccessResponse, User } from '@/services/api/types'

import { SubscriptionDetails, UserProfile } from '../types'

// Função auxiliar para mapear User para UserProfile
const mapUserToProfile = (user: User): UserProfile => {
  const theme = (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'

  return {
    id: user._id || user.googleId || '',
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || null,
    cpf: user.cpf || undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isActive: user.isActive !== undefined ? user.isActive : true,
    preferences: {
      theme,
      notifications: user.preferences?.notifications || false,
      defaultDashboard: user.preferences?.defaultDashboard,
      defaultPositionType:
        (user.preferences?.defaultPositionType as 'real' | 'simulated' | undefined) || undefined,
    },
  }
}

// Função auxiliar para obter dados de fallback
const getFallbackUserData = (userId: string): UserProfile => ({
  id: userId,
  name: localStorage.getItem('userName') || sessionStorage.getItem('userName') || '',
  email: localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') || '',
  phone: null,
  preferences: {
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'dark',
    notifications: false,
  },
})

export const ProfileService = {
  getUserProfile: async (userId: string): Promise<UserProfile> => {
    try {
      // Usar diretamente o userApi que já gerencia tokens e erros
      const user = await userApi.getUserById(userId)
      return mapUserToProfile(user)
    } catch (error) {
      console.error('Error in getUserProfile:', error)
      return getFallbackUserData(userId)
    }
  },

  updateUserProfile: async (userId: string, data: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      // Converter UserProfile para User
      const userData: Partial<User> = {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        cpf: data.cpf,
      }

      if (data.preferences) {
        userData.preferences = {
          ...data.preferences,
        }
      }

      // Usar diretamente o userApi
      const updatedUser = await userApi.updateUser(userId, userData)
      return mapUserToProfile(updatedUser)
    } catch (error) {
      console.error('Erro atualizando perfil do usuário:', error)
      throw error
    }
  },

  updatePassword: async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {
    try {
      // Usar diretamente o userApi
      await userApi.updatePassword(userId, oldPassword, newPassword)
    } catch (error) {
      console.error('Erro atualizando a senha:', error)
      throw error
    }
  },

  getSubscriptionDetails: async (userId: string): Promise<SubscriptionDetails> => {
    try {
      const response = await apiClient.get<ApiSuccessResponse<SubscriptionDetails>>(
        `/subscriptions/${userId}`,
      )

      return response.data.data
    } catch (error) {
      console.error('Erro ao obter assinatura:', error)
      // Retornar dados de fallback para assinatura
      return {
        id: '',
        planId: '',
        planName: 'Plano Básico',
        status: 'active',
        startDate: new Date().toISOString(),
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: {
          type: 'credit_card',
        },
      }
    }
  },

  updateSubscription: async (userId: string, planId: string): Promise<SubscriptionDetails> => {
    try {
      const response = await apiClient.put<ApiSuccessResponse<SubscriptionDetails>>(
        `/subscriptions/${userId}`,
        { planId },
      )

      return response.data.data
    } catch (error) {
      console.error('Erro na atualização de assinatura:', error)
      throw error
    }
  },
}
