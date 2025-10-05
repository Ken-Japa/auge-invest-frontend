import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { getAuthToken } from '@/utils/auth'

import { API_BASE_URL, API_ENDPOINTS } from './config'
import { ErrorCode, handleApiError } from './errorHandler'

export interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
  headers: any
}

export interface ApiError {
  message: string
  status?: number
  data?: any
  code?: ErrorCode
}

const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 240 * 60 * 1000 // 4 hours

/**
 * Invalida entradas de cache que correspondem à URL fornecida.
 * @param {string} urlToInvalidate A URL para a qual o cache deve ser invalidado.
 */
function invalidateCacheForUrl(urlToInvalidate: string) {
  for (const key of cache.keys()) {
    try {
      const parsedKey = JSON.parse(key)
      if (parsedKey.url === urlToInvalidate) {
        cache.delete(key)
      }
    } catch (e) {
      console.error('Error parsing cache key:', e)
    }
  }
}

/**
 * @class ApiClient
 * @description Cliente HTTP para interagir com a API, configurado com interceptors para autenticação e tratamento de erros, e um mecanismo de cache.
 */
class ApiClient {
  private client: AxiosInstance

  /**
   * Cria uma instância de ApiClient.
   * @param {string} baseURL A URL base para todas as requisições da API.
   */
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.client.interceptors.request.use(
      (config) => {
        const token = getAuthToken()
        if (token) {
          config.headers.Authorization = `${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(handleApiError(error))
      },
    )
  }

  /**
   * Realiza uma requisição GET com suporte a cache.
   * @template T O tipo de dado esperado na resposta.
   * @param {string} url A URL para a requisição.
   * @param {AxiosRequestConfig} [config] Configurações adicionais para a requisição Axios.
   * @returns {Promise<AxiosResponse<T>>} Uma promessa que resolve com a resposta da requisição.
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const cacheKey = JSON.stringify({ url, params: config?.params })
    const cached = cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`Cache hit for ${url}`)
      return Promise.resolve({
        data: cached.data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: config || {},
      } as AxiosResponse<T>)
    }

    console.log(`Cache miss for ${url}`)
    const response = await this.client.get<T>(url, config)
    cache.set(cacheKey, { data: response.data, timestamp: Date.now() })
    return response
  }

  /**
   * Realiza uma requisição POST e invalida o cache para a URL específica.
   * @template T O tipo de dado esperado na resposta.
   * @param {string} url A URL para a requisição.
   * @param {any} [data] Os dados a serem enviados no corpo da requisição.
   * @param {AxiosRequestConfig} [config] Configurações adicionais para a requisição Axios.
   * @returns {Promise<AxiosResponse<T>>} Uma promessa que resolve com a resposta da requisição.
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // Invalidate cache for the specific URL to ensure fresh data
    invalidateCacheForUrl(url)
    if (url.startsWith(API_ENDPOINTS.ALERTS.BASE)) {
      invalidateCacheForUrl(API_ENDPOINTS.ALERTS.USER_ALERTS)
    }
    return this.client.post<T>(url, data, config)
  }

  /**
   * Realiza uma requisição PUT e invalida o cache para a URL específica.
   * @template T O tipo de dado esperado na resposta.
   * @param {string} url A URL para a requisição.
   * @param {any} [data] Os dados a serem enviados no corpo da requisição.
   * @param {AxiosRequestConfig} [config] Configurações adicionais para a requisição Axios.
   * @returns {Promise<AxiosResponse<T>>} Uma promessa que resolve com a resposta da requisição.
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // Invalidate cache for the specific URL to ensure fresh data
    invalidateCacheForUrl(url)
    if (url.startsWith(API_ENDPOINTS.ALERTS.BASE)) {
      invalidateCacheForUrl(API_ENDPOINTS.ALERTS.USER_ALERTS)
    }
    return this.client.put<T>(url, data, config)
  }

  /**
   * Realiza uma requisição DELETE e invalida o cache para a URL específica.
   * @template T O tipo de dado esperado na resposta.
   * @param {string} url A URL para a requisição.
   * @param {AxiosRequestConfig} [config] Configurações adicionais para a requisição Axios.
   * @returns {Promise<AxiosResponse<T>>} Uma promessa que resolve com a resposta da requisição.
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // Invalidate cache for the specific URL to ensure fresh data
    invalidateCacheForUrl(url)
    if (url.startsWith(API_ENDPOINTS.ALERTS.BASE)) {
      invalidateCacheForUrl(API_ENDPOINTS.ALERTS.USER_ALERTS)
    }
    return this.client.delete<T>(url, config)
  }

  /**
   * Realiza uma requisição PATCH e invalida o cache para a URL específica.
   * @template T O tipo de dado esperado na resposta.
   * @param {string} url A URL para a requisição.
   * @param {any} [data] Os dados a serem enviados no corpo da requisição.
   * @param {AxiosRequestConfig} [config] Configurações adicionais para a requisição Axios.
   * @returns {Promise<AxiosResponse<T>>} Uma promessa que resolve com a resposta da requisição.
   */
  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // Invalidate cache for the specific URL to ensure fresh data
    invalidateCacheForUrl(url)
    if (url.startsWith(API_ENDPOINTS.ALERTS.BASE)) {
      invalidateCacheForUrl(API_ENDPOINTS.ALERTS.USER_ALERTS)
    }
    return this.client.patch<T>(url, data, config)
  }
}

const apiClient = new ApiClient(API_BASE_URL)

export default apiClient
