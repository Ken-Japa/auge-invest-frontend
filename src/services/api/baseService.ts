import apiClient from './client'
import { ErrorCode, handleApiError } from './errorHandler'
import { ApiSuccessResponse } from './types'

export class BaseApiService {
  protected async get<T>(
    url: string,
    params: any = {},
    errorCode: ErrorCode = ErrorCode.SERVER_ERROR,
  ): Promise<T> {
    try {
      const response = await apiClient.get<ApiSuccessResponse<T>>(url, { params })
      return response.data.data
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error)
      throw handleApiError(error, errorCode)
    }
  }

  protected async post<T>(
    url: string,
    data?: any,
    errorCode: ErrorCode = ErrorCode.SERVER_ERROR,
  ): Promise<T> {
    try {
      const response = await apiClient.post<ApiSuccessResponse<T>>(url, data)
      return response.data.data
    } catch (error) {
      console.error(`Error posting data to ${url}:`, error)
      throw handleApiError(error, errorCode)
    }
  }

  protected async put<T>(url: string, data?: any, errorCode: ErrorCode = ErrorCode.SERVER_ERROR): Promise<T> {
    try {
      const response = await apiClient.put<ApiSuccessResponse<T>>(url, data)
      return response.data.data
    } catch (error) {
      console.error(`Error updating data at ${url}:`, error)
      throw handleApiError(error, errorCode)
    }
  }

  protected async delete<T>(
    url: string,
    params: any = {},
    errorCode: ErrorCode = ErrorCode.SERVER_ERROR,
  ): Promise<T> {
    try {
      const response = await apiClient.delete<ApiSuccessResponse<T>>(url, { params })
      return response.data.data
    } catch (error) {
      console.error(`Error deleting data from ${url}:`, error)
      throw handleApiError(error, errorCode)
    }
  }

  protected async patch<T>(
    url: string,
    data?: any,
    errorCode: ErrorCode = ErrorCode.SERVER_ERROR,
  ): Promise<T> {
    try {
      const response = await apiClient.patch<ApiSuccessResponse<T>>(url, data)
      return response.data.data
    } catch (error) {
      console.error(`Error patching data at ${url}:`, error)
      throw handleApiError(error, errorCode)
    }
  }
}
