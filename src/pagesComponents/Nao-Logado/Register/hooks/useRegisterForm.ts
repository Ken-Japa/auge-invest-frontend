import { useRouter } from 'next/navigation'
import { type ChangeEvent, type FormEvent, useCallback, useState } from 'react'

import { FormData, FormErrors } from '../types'
import { validateForm } from '../utils/validation'

const MAX_ATTEMPTS = 5

export const useRegisterForm = (onBlock: () => void) => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [registerAttempts, setRegisterAttempts] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }))
      }
    },
    [errors],
  )

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      if (!acceptedTerms) {
        alert('Você precisa aceitar os termos e condições para continuar')
        return
      }

      const { errors: validationErrors, isValid } = validateForm(formData, acceptedTerms)
      setErrors(validationErrors)

      if (isValid) {
        setIsSubmitting(true)

        try {
          const userData = {
            name: formData.name,
            cpf: formData.cpf.replace(/[^\d]/g, ''),
            phone: formData.phone.replace(/[^\d]/g, ''),
            email: formData.email,
            password: formData.password,
          }

          const response = await fetch('https://api-servidor-yupg.onrender.com/user/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Falha ao registrar usuário')
          }

          const data = await response.json()

          alert('Registro realizado com sucesso! Faça login para continuar.')
          router.push('/login')
        } catch (error) {
          console.error('Registration error:', error)

          setRegisterAttempts((prev) => {
            const newAttempts = prev + 1
            if (newAttempts >= MAX_ATTEMPTS) {
              onBlock()
              return 0
            }
            return newAttempts
          })

          alert(`Erro ao registrar: ${error instanceof Error ? error.message : 'Tente novamente mais tarde'}`)
        } finally {
          setIsSubmitting(false)
        }
      }
    },
    [formData, acceptedTerms, router, onBlock],
  )

  const setAcceptedTermsCallback = useCallback((checked: boolean) => {
    setAcceptedTerms(checked)
  }, [])

  return {
    formData,
    errors,
    acceptedTerms,
    isSubmitting,
    setAcceptedTerms: setAcceptedTermsCallback,
    handleChange,
    handleSubmit,
  }
}
