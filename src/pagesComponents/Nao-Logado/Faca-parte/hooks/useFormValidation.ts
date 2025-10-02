import { FormData } from '../types'

export const useFormValidation = () => {
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePhone = (phone: string) => {
    const regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/
    return regex.test(phone)
  }

  const validateForm = (formData: FormData) => {
    let isValid = true
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      message: '',
      experience: '',
      role: '',
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
      isValid = false
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
      isValid = false
    }

    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido (Ex: 11999999999)'
      isValid = false
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Experiência é obrigatória'
      isValid = false
    } else if (formData.experience.trim().length < 15) {
      newErrors.experience = 'A experiência deve ter pelo menos 15 caracteres'
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória'
      isValid = false
    } else if (formData.message.trim().length < 50) {
      newErrors.message = 'A mensagem deve ter pelo menos 50 caracteres'
      isValid = false
    }

    // Add validation for role
    if (!formData.role) {
      newErrors.role = 'Cargo de interesse é obrigatório'
      isValid = false
    }

    return { isValid, errors: newErrors }
  }

  return { validateForm }
}
