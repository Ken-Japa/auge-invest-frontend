import { clearAuthData, setAuthData } from '@/utils/auth'

import { BaseApiService } from '../baseService'
import { API_ENDPOINTS } from '../config'
import { ErrorCode, handleApiError } from '../errorHandler'
import { LoginRequest, LoginResponse, User } from '../types'

class AuthApiService extends BaseApiService {
  login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await this.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)

      // Store auth data
      if (response.token) {
        setAuthData(response.token, response.user?._id)
      }

      return response
    } catch (error) {
      console.error('Falha no login:', error)
      throw handleApiError(error, ErrorCode.AUTHENTICATION_FAILED)
    }
  }

  logout = async (): Promise<void> => {
    try {
      await this.post<void>(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Erro durante o logout do servidor:', error)
    } finally {
      clearAuthData()
    }
  }

  getCurrentUser = async (): Promise<User> => {
    try {
      const response = await this.get<User>(API_ENDPOINTS.AUTH.CURRENT_USER)
      return response
    } catch (error) {
      console.error('Erro ao buscar usuário atual:', error)
      throw handleApiError(error, ErrorCode.USER_NOT_FOUND)
    }
  }

  register = async (userData: { name: string; email: string; password: string }): Promise<User> => {
    try {
      const response = await this.post<User>(API_ENDPOINTS.AUTH.REGISTER, userData)
      return response
    } catch (error) {
      console.error('Falha no registro:', error)
      throw handleApiError(error, ErrorCode.REGISTRATION_FAILED)
    }
  }

  googleLogin = async (token: string): Promise<LoginResponse> => {
    try {
      const response = await this.post<LoginResponse>(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, { token })

      if (response.token) {
        setAuthData(response.token, response.user?._id)
      }

      return response
    } catch (error) {
      console.error('Falha no login com Google:', error)
      throw handleApiError(error, ErrorCode.AUTHENTICATION_FAILED)
    }
  }
}

export const authApi = new AuthApiService()
