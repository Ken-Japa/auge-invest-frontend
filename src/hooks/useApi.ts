import { useCallback, useState } from 'react'

import { ApiError } from '../services/api/client'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: ApiError) => void
}

/**
 * @typedef {Object} ApiState
 * @property {T | null} data - Os dados retornados pela função da API.
 * @property {boolean} loading - Indica se a requisição está em andamento.
 * @property {ApiError | null} error - O objeto de erro da API, se houver.
 *
 * @typedef {Object} UseApiOptions
 * @property {(data: any) => void} [onSuccess] - Função de callback a ser executada em caso de sucesso.
 * @property {(error: ApiError) => void} [onError] - Função de callback a ser executada em caso de erro.
 *
 * @template T
 * @param {(...args: any[]) => Promise<T>} apiFunction - A função assíncrona da API a ser executada.
 * @param {UseApiOptions} [options] - Opções de configuração para o hook.
 * @returns {ApiState<T> & { execute: (...args: any[]) => Promise<T>, reset: () => void }} Um objeto contendo o estado da requisição (data, loading, error), a função para executar a requisição e uma função para resetar o estado.
 */
export function useApi<T>(apiFunction: (...args: any[]) => Promise<T>, options?: UseApiOptions) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ data: null, loading: true, error: null })

      try {
        const data = await apiFunction(...args)
        setState({ data, loading: false, error: null })
        options?.onSuccess?.(data)
        return data
      } catch (error) {
        const apiError = error as ApiError
        setState({ data: null, loading: false, error: apiError })
        options?.onError?.(apiError)
        throw apiError
      }
    },
    [apiFunction, options],
  )

  return {
    ...state,
    execute,
    reset: () => setState({ data: null, loading: false, error: null }),
  }
}
