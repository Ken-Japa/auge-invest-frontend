import { signIn } from 'next-auth/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { LOGIN_CONSTANTS } from '../constants'
import { FormData, FormErrors } from '../types'
import { validateLoginForm } from '../utils/validation'

const DEFAULT_REDIRECT = '/visao-economia'

export const useLoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimer, setBlockTimer] = useState(0)
  const [rememberMe, setRememberMe] = useState(false)

  // Use a ref to track validation state to prevent race conditions
  const isValidatingRef = useRef(false)
  // Debounce timer reference
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Debounced change handler to prevent excessive validation
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target

      // Update form data immediately for responsive UI
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Clear specific field error when user starts typing again
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name as keyof FormErrors]
          return newErrors
        })
      }

      // Clear previous debounce timer if it exists
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      // Don't validate on every keystroke - wait until user stops typing
      // This prevents excessive validation and potential browser conflicts
    },
    [errors],
  )

  const validateForm = useCallback(() => {
    // Prevent multiple validations from running simultaneously
    if (isValidatingRef.current) return false

    isValidatingRef.current = true
    const newErrors = validateLoginForm(formData.email, formData.password)
    setErrors(newErrors)
    isValidatingRef.current = false
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleBlockUser = useCallback(() => {
    const blockedUntil = Date.now() + LOGIN_CONSTANTS.BLOCK_DURATION
    localStorage.setItem('loginBlockedUntil', blockedUntil.toString())
    setIsBlocked(true)
    setBlockTimer(LOGIN_CONSTANTS.BLOCK_TIMER)
    setLoginAttempts(0)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (isBlocked) {
        return
      }

      // Only validate on form submission
      if (validateForm()) {
        try {
          const searchParams = new URLSearchParams(window.location.search)
          const callbackUrl = searchParams.get('callbackUrl') || DEFAULT_REDIRECT

          const result = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
            callbackUrl,
          })

          if (result?.error) {
            setLoginAttempts((prev) => {
              const newAttempts = prev + 1
              if (newAttempts >= LOGIN_CONSTANTS.MAX_LOGIN_ATTEMPTS) {
                handleBlockUser()
                return 0
              }
              return newAttempts
            })

            setErrors({ password: 'Email ou senha inválidos' })
          } else if (result?.url) {
            window.location.href = result.url
          }
        } catch (error) {
          setErrors({ password: 'Erro de autenticação. Tente novamente.' })
        }
      }
    },
    [formData, isBlocked, validateForm, handleBlockUser],
  )

  const handleGoogleSignIn = useCallback(async (): Promise<void> => {
    try {
      const searchParams = new URLSearchParams(window.location.search)
      const callbackUrl = searchParams.get('callbackUrl') || DEFAULT_REDIRECT

      // Use the signIn function with the proper parameters to force account selection
      await signIn('google', {
        callbackUrl,
        // Setting redirect to true ensures the OAuth flow works properly
        redirect: true,
        // Force Google to show the account picker
        prompt: 'select_account',
      })
    } catch (error) {
      console.error('Google sign-in error:', error)
    }
  }, [])

  // Check for blocked status on mount
  useEffect(() => {
    const blockedUntil = localStorage.getItem('loginBlockedUntil')
    if (blockedUntil) {
      const timeLeft = parseInt(blockedUntil) - Date.now()
      if (timeLeft > 0) {
        setIsBlocked(true)
        setBlockTimer(Math.ceil(timeLeft / 1000))
      } else {
        localStorage.removeItem('loginBlockedUntil')
      }
    }
  }, [])

  // Handle block timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isBlocked && blockTimer > 0) {
      interval = setInterval(() => {
        setBlockTimer((prev) => {
          if (prev <= 1) {
            setIsBlocked(false)
            localStorage.removeItem('loginBlockedUntil')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isBlocked, blockTimer])

  return {
    formData,
    errors,
    isBlocked,
    blockTimer,
    rememberMe,
    handleChange,
    handleSubmit,
    setRememberMe,
    handleGoogleSignIn,
  }
}
