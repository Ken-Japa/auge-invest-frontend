import SendIcon from '@mui/icons-material/Send'
import { Alert, Snackbar, Stack, Typography } from '@mui/material'
import { type FC, useState } from 'react'

import { visitorColors } from '@/theme/palette/visitor'

import { NewsletterSkeleton } from './NewsletterSkeleton'
import { NewsletterContainer, StyledTextField, SubmitButton } from './styled'

interface NewsletterProps {
  isLoading?: boolean
}

export const Newsletter: FC<NewsletterProps> = ({ isLoading }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleClose = () => {
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica de email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, insira um email válido.')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
      setEmail('')
    } catch (err) {
      setError('Ocorreu um erro ao cadastrar seu email. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <NewsletterSkeleton />
  }

  return (
    <NewsletterContainer>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h3" color={visitorColors.text}>
          Quer ficar por dentro das novidades?
        </Typography>
        <Typography color={visitorColors.textSecondary} maxWidth="600px">
          Cadastre-se para receber atualizações exclusivas e descontos especiais
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width="100%" maxWidth="500px">
          <StyledTextField
            variant="outlined"
            placeholder="Seu melhor email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            disabled={isSubmitting}
          />
          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            endIcon={<SendIcon />}
          >
            {isSubmitting ? 'Enviando...' : 'Inscrever-se'}
          </SubmitButton>
        </Stack>
      </Stack>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Email cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </NewsletterContainer>
  )
}
