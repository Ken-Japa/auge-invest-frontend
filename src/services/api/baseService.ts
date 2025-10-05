import apiClient from './client'
import { ErrorCode, handleApiError } from './errorHandler'
import { ApiSuccessResponse } from './types'

/**
 * @class BaseApiService
 * @description Classe base para serviços de API, fornecendo métodos HTTP genéricos e tratamento de erros.
 */
export class BaseApiService {
  /**
   * Realiza uma requisição GET.
   * @template T O tipo de dado esperado na resposta.
   * @param {string} url A URL para a requisição.
   * @param {any} [params={}] Os parâmetros da query.
   * @param {ErrorCode} [errorCode=ErrorCode.SERVER_ERROR] O código de erro a ser usado em caso de falha.
   * @param {AbortSignal} [signal] Um AbortSignal para cancelar a requisição.
   * @returns {Promise<T>} Uma promessa que resolve com os dados da resposta.
   */
  protected async get<T>(
    url: string,
    params: any = {},
    errorCode: ErrorCode = ErrorCode.SERVER_ERROR,
    signal?: AbortSignal,
  ): Promise<T> {
    try {
      const response = await apiClient.get<ApiSuccessResponse<T>>(url, { params, signal })
      return response.data.data
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error)
      throw handleApiError(error, errorCode)
    }
  }

  /**
   * Realiza uma requisição POST.
   * @template T O tipo de dado esperado na resposta.
   * @param {string} url A URL para a requisição.
   * @param {any} [data] Os dados a serem enviados no corpo da requisição.
   * @param {ErrorCode} [errorCode=ErrorCode.SERVER_ERROR] O código de erro a ser usado em caso de falha.
   * @param {AbortSignal} [signal] Um AbortSignal para cancelar a requisição.
   * @returns {Promise<T>} Uma promessa que resolve com os dados da resposta.
   */
  protected async post<T>(
    url: string,
    data?: any,
    errorCode: ErrorCode = ErrorCode.SERVER_ERROR,
    signal?: AbortSignal,
  ): Promise<T> {
    try {
      const response = await apiClient.post<ApiSuccessResponse<T>>(url, data, { signal })
      return response.data.data
    } catch (error) {
      console.error(`Error posting data to ${url}:`, error)
      throw handleApiError(error, errorCode)
    }
  }

  /**
   * Realiza uma requisição PUT.
   * @template T O tipo de dado esperado na resposta.
   * @param {string} url A URL para a requisição.
   * @param {any} [data] Os dados a serem enviados no corpo da requisição.
   * @param {ErrorCode} [errorCode=ErrorCode.SERVER_ERROR] O código de erro a ser usado em caso de falha.
   * @param {AbortSignal} [signal] Um AbortSignal para cancelar a requisição.
   * @returns {Promise<T>} Uma promessa que resolve com os dados da resposta.
   */
  protected async put<T>(
    url: string,
    data?: any,
    errorCode: ErrorCode = ErrorCode.SERVER_ERROR,
    signal?: AbortSignal,
  ): Promise<T> {
    try {
      const response = await apiClient.put<ApiSuccessResponse<T>>(url, data, { signal })
      return response.data.data
    } catch (error) {
      console.error(`Error updating data at ${url}:`, error)
      throw handleApiError(error, errorCode)
    }
  }

  /**
   * Realiza uma requisição DELETE.
   * @template T O tipo de dado esperado na resposta.
   * @param {string} url A URL para a requisição.
   * @param {any} [params={}] Os parâmetros da query.
   * @param {ErrorCode} [errorCode=ErrorCode.SERVER_ERROR] O código de erro a ser usado em caso de falha.
   * @param {AbortSignal} [signal] Um AbortSignal para cancelar a requisição.
   * @returns {Promise<T>} Uma promessa que resolve com os dados da resposta.
   */
  protected async delete<T>(
    url: string,
    params: any = {},
    errorCode: ErrorCode = ErrorCode.SERVER_ERROR,
    signal?: AbortSignal,
  ): Promise<T> {
    try {
      const response = await apiClient.delete<ApiSuccessResponse<T>>(url, { params, signal })
      return response.data.data
    } catch (error) {
      console.error(`Error deleting data from ${url}:`, error)
      throw handleApiError(error, errorCode)
    }
  }

  /**
   * Realiza uma requisição PATCH.
   * @template T O tipo de dado esperado na resposta.
   * @param {string} url A URL para a requisição.
   * @param {any} [data] Os dados a serem enviados no corpo da requisição.
   * @param {ErrorCode} [errorCode=ErrorCode.SERVER_ERROR] O código de erro a ser usado em caso de falha.
   * @param {AbortSignal} [signal] Um AbortSignal para cancelar a requisição.
   * @returns {Promise<T>} Uma promessa que resolve com os dados da resposta.
   */
  protected async patch<T>(
    url: string,
    data?: any,
    errorCode: ErrorCode = ErrorCode.SERVER_ERROR,
    signal?: AbortSignal,
  ): Promise<T> {
    try {
      const response = await apiClient.patch<ApiSuccessResponse<T>>(url, data, { signal })
      return response.data.data
    } catch (error) {
      console.error(`Error patching data at ${url}:`, error)
      throw handleApiError(error, errorCode)
    }
  }
}
