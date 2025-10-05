import axios, { AxiosError } from 'axios'
import { useCallback, useState, useEffect, useRef } from 'react'

// Assuming 'api' is your Axios instance

/**
 * @typedef {Object} UseApiResult
 * @property {T | null} data - The data returned from the API.
 * @property {boolean} loading - Indicates if the API call is currently in progress.
 * @property {AxiosError<E> | null} error - Any error that occurred during the API call.
 * @property {(...args: any[]) => Promise<AbortController>} execute - Function to execute the API call, returning an AbortController for manual cancellation.
 */

/**
 * Custom hook for making API calls with built-in loading, error, and cancellation handling.
 * It leverages AbortController to allow for request cancellation, which is useful for preventing
 * race conditions and unnecessary network requests, especially when components unmount.
 *
 * @template T - The type of the successful response data.
 * @template E - The type of the error response data.
 * @param {(signal?: AbortSignal, ...args: any[]) => Promise<T>} apiCall - The API call function to execute.
 *   This function should accept an `AbortSignal` as its first argument, which will be used
 *   to cancel the request if the component unmounts or `execute` is called again.
 * @param {Object} [options] - Options for the API call.
 * @param {boolean} [options.immediate=false] - Whether to execute the API call immediately on mount.
 * @param {function(T): void} [options.onSuccess] - Callback function to be called on successful API response.
 * @param {function(AxiosError<E>): void} [options.onError] - Callback function to be called on API error.
 * @returns {UseApiResult<T, E>}
 */
export const useApi = <T, E = unknown>(
  apiCall: (signal?: AbortSignal, ...args: any[]) => Promise<T>,
  options?: {
    immediate?: boolean
    onSuccess?: (data: T) => void
    onError?: (error: AxiosError<E>) => void
  },
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(options?.immediate || false)
  const [error, setError] = useState<AxiosError<E> | null>(null)
  const currentController = useRef<AbortController | undefined>(undefined)

  /**
   * Executa a chamada de API. Pode ser chamado manualmente para iniciar a requisição.
   * @param {...any[]} args Argumentos adicionais a serem passados para a função `apiCall`.
   * @returns {Promise<AbortController>} Uma promessa que resolve com o AbortController usado para a requisição, permitindo cancelamento externo.
   */
  const execute = useCallback(
    async (...args: any[]) => {
      setLoading(true)
      setError(null)
      setData(null)

      // Create a new AbortController for each execution
      const controller = new AbortController()
      currentController.current = controller // Store the controller in the ref
      const signal = controller.signal

      try {
        const response = await apiCall(signal, ...args)
        setData(response)
        options?.onSuccess?.(response)
      } catch (err) {
        if (axios.isCancel(err)) {
        } else if (err instanceof AxiosError) {
          setError(err)
        } else {
          setError(new AxiosError('An unknown error occurred', undefined, undefined, undefined, err as any))
        }
      } finally {
        setLoading(false)
      }

      // Return the controller so it can be used for external cancellation if needed
      return controller
    },
    [apiCall, options],
  )

  useEffect(() => {
    if (options?.immediate) {
      execute()
    }

    return () => {
      // Aborta a requisição se o componente for desmontado ou se uma nova execução for iniciada.
      if (currentController.current) {
        currentController.current.abort()
      }
    }
  }, [options?.immediate, execute])

  return { data, loading, error, execute }
}
