import { Session } from 'next-auth'
import { useCallback, useEffect, useState } from 'react'

import { getUserId } from '@/utils/auth'

import { ProfileService } from '../services/api'
import { UserProfile } from '../types'

interface NotificationType {
  open: boolean
  message: string
  type: 'success' | 'error'
}

export const useProfileData = (session: Session | null) => {
  const [userData, setUserData] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notification, setNotification] = useState<NotificationType>({
    open: false,
    message: '',
    type: 'success',
  })

  // Função para formatar datas
  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }, [])

  // Salvar dados do usuário no localStorage quando a sessão mudar
  useEffect(() => {
    if (session?.user) {
      if (session.user.name) {
        localStorage.setItem('userName', session.user.name)
        sessionStorage.setItem('userName', session.user.name)
      }
      if (session.user.email) {
        localStorage.setItem('userEmail', session.user.email)
        sessionStorage.setItem('userEmail', session.user.email)
      }
      if (session.user.id) {
        localStorage.setItem('userId', session.user.id)
        sessionStorage.setItem('userId', session.user.id)
      }
    }
  }, [session])

  // Buscar dados do usuário quando a sessão mudar
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const userId = getUserId(session)

        if (!userId) {
          throw new Error('User ID não foi encontrado')
        }

        const data = await ProfileService.getUserProfile(userId)
        setUserData(data)
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error)
        setNotification({
          open: true,
          message: 'Erro ao carregar dados do perfil',
          type: 'error',
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchUserData()
    } else {
      setIsLoading(false)
    }
  }, [session])

  // Obter valores para exibição
  const getDisplayValues = useCallback(() => {
    return {
      name: userData?.name || session?.user?.name || '',
      email: userData?.email || session?.user?.email || '',
      phone: userData?.phone || '',
      cpf: userData?.cpf || '',
    }
  }, [userData, session])

  const displayValues = getDisplayValues()

  const displayCreatedAt = userData?.createdAt ? formatDate(userData.createdAt) : null
  const displayUpdatedAt = userData?.updatedAt ? formatDate(userData.updatedAt) : null
  const isActiveUser = userData?.isActive !== undefined ? userData.isActive : true

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }))
  }

  return {
    userData,
    setUserData,
    isLoading,
    notification,
    setNotification,
    displayValues,
    displayCreatedAt,
    displayUpdatedAt,
    isActiveUser,
    handleCloseNotification,
    refreshUserData: async () => {
      const userId = getUserId(session)
      if (userId) {
        const data = await ProfileService.getUserProfile(userId)
        setUserData(data)
      }
    },
  }
}
