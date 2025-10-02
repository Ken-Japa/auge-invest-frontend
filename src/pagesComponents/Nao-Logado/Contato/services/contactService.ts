import { FormData } from '../types'

export const submitContactForm = async (formData: FormData): Promise<void> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Falha ao enviar formulário de contato')
    }
  } catch (error) {
    throw new Error('Erro de rede ao enviar formulário')
  }
}
