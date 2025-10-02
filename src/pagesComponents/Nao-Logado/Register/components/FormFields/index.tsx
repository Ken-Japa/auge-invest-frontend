import { type ChangeEvent } from 'react'

import { FormData, FormErrors } from '../../types'
import { formatCPF, formatPhone } from '../../utils/formatUtils'
import { getPasswordStrength } from '../../utils/passwordUtils'

import { FormFieldsSkeleton } from './FormFieldsSkeleton'
import { PasswordStrengthContainer, StrengthText, StyledLinearProgress, StyledTextField } from './styled'

interface FormFieldsProps {
  formData: FormData
  errors: FormErrors
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading?: boolean
}

interface PasswordStrength {
  score: number
  color: string
  label: string
}

export const FormFields = ({ formData, errors, onChange, isLoading }: FormFieldsProps) => {
  if (isLoading) {
    return <FormFieldsSkeleton />
  }

  const passwordStrength: PasswordStrength = getPasswordStrength(formData.password)

  const createMaskedChangeHandler =
    (name: string, formatter: (value: string) => string) => (e: ChangeEvent<HTMLInputElement>) => {
      const masked = formatter(e.target.value)
      onChange({
        target: {
          name,
          value: masked,
        },
      } as ChangeEvent<HTMLInputElement>)
    }

  return (
    <>
      <StyledTextField
        label="Nome completo"
        name="name"
        value={formData.name}
        onChange={onChange}
        error={!!errors.name}
        helperText={errors.name}
        required
        inputProps={{
          autoComplete: 'name',
        }}
      />
      <StyledTextField
        name="cpf"
        label="CPF"
        value={formData.cpf}
        onChange={createMaskedChangeHandler('cpf', formatCPF)}
        error={!!errors.cpf}
        helperText={errors.cpf}
        required
        inputProps={{ maxLength: 14 }}
      />
      <StyledTextField
        name="phone"
        label="Telefone"
        value={formData.phone}
        onChange={createMaskedChangeHandler('phone', formatPhone)}
        error={!!errors.phone}
        helperText={errors.phone}
        required
        inputProps={{ maxLength: 15 }}
      />
      <StyledTextField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={onChange}
        error={!!errors.email}
        helperText={errors.email}
        required
      />
      <StyledTextField
        name="password"
        label="Senha"
        type="password"
        value={formData.password}
        onChange={onChange}
        error={!!errors.password}
        helperText={errors.password}
        required
      />
      {formData.password && (
        <PasswordStrengthContainer>
          <StyledLinearProgress
            variant="determinate"
            value={passwordStrength.score}
            sx={{ '& .MuiLinearProgress-bar': { backgroundColor: passwordStrength.color } }}
          />
          <StrengthText variant="caption">Força da senha: {passwordStrength.label}</StrengthText>
        </PasswordStrengthContainer>
      )}
      <StyledTextField
        name="confirmPassword"
        label="Confirmar senha"
        type="password"
        value={formData.confirmPassword}
        onChange={onChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        required
      />
    </>
  )
}

export default FormFields
