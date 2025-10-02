import { Session } from 'next-auth'
import { useCallback, useState } from 'react'

import { getUserId } from '@/utils/auth'

import { ProfileService } from '../services/api'
import { UserProfile } from '../types'

export const useProfileActions = (
  session: Session | null,
  userData: UserProfile | null,
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>,
  setNotification: (notification: { open: boolean; message: string; type: 'success' | 'error' }) => void,
  displayValues: { name: string; email: string; phone: string | null; cpf: string | null },
) => {
  const [editField, setEditField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  // Iniciar edição de um campo
  const handleEdit = useCallback((field: string, value: string) => {
    setEditField(field)
    setEditValue(value || '')
  }, [])

  // Salvar alterações em um campo
  const handleSave = useCallback(
    async (value: string) => {
      if (!editField) return

      setIsSaving(true)
      try {
        const userId = getUserId(session)

        if (!userId) {
          throw new Error('User ID não encontrado')
        }

        let updatedProfile: UserProfile

        // Atualizar preferências ou campos básicos
        if (editField === 'defaultDashboard' || editField === 'defaultPositionType') {
          updatedProfile = await ProfileService.updateUserProfile(userId, {
            preferences: {
              ...(userData?.preferences || {}),
              [editField]: value,
            },
          } as Partial<UserProfile>)
        } else {
          updatedProfile = await ProfileService.updateUserProfile(userId, {
            [editField]: value,
          } as Partial<UserProfile>)
        }

        // Atualizar estado local com os dados retornados da API
        setUserData(updatedProfile)

        setNotification({
          open: true,
          message: 'Perfil atualizado com sucesso',
          type: 'success',
        })
      } catch (error: any) {
        console.error('Error updating profile:', error)

        // Mensagens de erro mais específicas
        let errorMessage = 'Erro ao atualizar perfil'

        if (error.message) {
          if (error.message.includes('validation')) {
            errorMessage = 'Dados inválidos. Verifique as informações fornecidas.'
          } else if (error.message.includes('unauthorized')) {
            errorMessage = 'Sessão expirada. Faça login novamente.'
          } else if (error.message.includes('network')) {
            errorMessage = 'Erro de conexão. Verifique sua internet.'
          }
        }

        setNotification({
          open: true,
          message: errorMessage,
          type: 'error',
        })
      } finally {
        setIsSaving(false)
        setEditField(null)
      }
    },
    [editField, userData, session, setUserData, setNotification],
  )

  // Alterar senha
  const handlePasswordChange = useCallback(
    async (oldPassword: string, newPassword: string) => {
      try {
        const userId = getUserId(session)

        if (!userId) {
          throw new Error('User ID não encontrado')
        }

        await ProfileService.updatePassword(userId, oldPassword, newPassword)

        setShowPasswordDialog(false)
        setPasswordError('')

        setNotification({
          open: true,
          message: 'Senha atualizada com sucesso',
          type: 'success',
        })
      } catch (error) {
        console.error('Error updating password:', error)
        setPasswordError('Falha ao atualizar senha. Verifique sua senha atual.')
      }
    },
    [session, setNotification],
  )

  return {
    editField,
    editValue,
    isSaving,
    showPasswordDialog,
    passwordError,
    setEditField,
    setEditValue,
    setShowPasswordDialog,
    setPasswordError,
    handleEdit,
    handleSave,
    handlePasswordChange,
  }
}
