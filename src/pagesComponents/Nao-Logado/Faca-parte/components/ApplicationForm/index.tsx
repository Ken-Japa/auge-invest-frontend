import { Stack } from '@mui/material'
import { type FC, useState } from 'react'

import { MAX_JOIN_ATTEMPTS, MESSAGES } from '../../constants'
import { useBlockTimer } from '../../hooks/useBlockTimer'
import { useFormState } from '../../hooks/useFormState'
import { useFormValidation } from '../../hooks/useFormValidation'
import type { ApplicationFormProps } from '../../types'
import { ApplicationFormSkeleton } from './ApplicationFormSkeleton'
import { FormFields } from './components/FormFields/index'
import { FormSnackbar } from './components/FormSnackbar/index'
import { SubmitButton } from './components/SubmitButton/index'
import { JoinTeamForm } from './styled'

export const ApplicationForm: FC<ApplicationFormProps> = ({ isLoading }) => {
  const [joinAttempts, setJoinAttempts] = useState(0)
  const { isBlocked, blockTimer, blockUser } = useBlockTimer()
  const { validateForm } = useFormValidation()
  const {
    formData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    snackbar,
    setSnackbar,
    handleChange,
    closeSnackbar,
  } = useFormState()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isBlocked) {
      setSnackbar({
        open: true,
        message: MESSAGES.WAIT_BLOCK(blockTimer),
        severity: 'error',
      })
      return
    }

    const { isValid, errors: validationErrors } = validateForm(formData)
    setErrors(validationErrors)

    if (isValid) {
      setJoinAttempts((prev) => {
        const newAttempts = prev + 1
        if (newAttempts >= MAX_JOIN_ATTEMPTS) {
          blockUser()
          return 0
        }
        return newAttempts
      })

      setIsSubmitting(true)
      try {
        // Simulação de envio para API
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setSnackbar({
          open: true,
          message: MESSAGES.SUCCESS,
          severity: 'success',
        })
      } catch (error) {
        setSnackbar({
          open: true,
          message: MESSAGES.ERROR,
          severity: 'error',
        })
      } finally {
        setIsSubmitting(false)
      }
    } else {
      setSnackbar({
        open: true,
        message: MESSAGES.VALIDATION_ERROR,
        severity: 'error',
      })
    }
  }

  if (isLoading) return <ApplicationFormSkeleton />

  return (
    <>
      <JoinTeamForm onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormFields formData={formData} errors={errors} handleChange={handleChange} />
          <SubmitButton isSubmitting={isSubmitting} isBlocked={isBlocked} blockTimer={blockTimer} />
        </Stack>
      </JoinTeamForm>
      <FormSnackbar {...snackbar} onClose={closeSnackbar} />
    </>
  )
}
