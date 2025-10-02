import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { type FC } from 'react'

import { visitorColors } from '@/theme/palette/visitor'

import { ROLES } from '../../../../constants'
import { FormData, FormErrors } from '../../../../types'

import { selectStyles } from './styled'

interface FormFieldsProps {
  formData: FormData
  errors: FormErrors
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const FormFields: FC<FormFieldsProps> = ({ formData, errors, handleChange }) => {
  return (
    <>
      <TextField
        label="Nome Completo"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        required
      />
      <TextField
        label="Telefone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
        fullWidth
        placeholder="(11) 99999-9999"
      />
      <FormControl fullWidth error={!!errors.role}>
        <InputLabel
          id="role-label"
          sx={{
            color: visitorColors.textMuted,
            '&.Mui-focused': {
              color: visitorColors.primary,
            },
          }}
        >
          Cargo de Interesse
        </InputLabel>
        <Select
          labelId="role-label"
          name="role"
          value={formData.role}
          onChange={handleChange as any}
          label="Cargo de Interesse *"
          {...selectStyles}
        >
          {ROLES.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
        {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
      </FormControl>
      <TextField
        label="Experiência Profissional"
        name="experience"
        multiline
        rows={3}
        value={formData.experience}
        onChange={handleChange}
        error={!!errors.experience}
        helperText={errors.experience}
        fullWidth
        required
      />
      <TextField
        label="Portfolio (URL)"
        name="portfolio"
        value={formData.portfolio}
        onChange={handleChange}
        fullWidth
        placeholder="https://meuportfolio.com"
      />
      <TextField
        label="GitHub (URL)"
        name="github"
        value={formData.github}
        onChange={handleChange}
        fullWidth
        placeholder="https://github.com/username"
      />
      <TextField
        label="Por que você quer se juntar à nossa equipe?"
        name="message"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
        error={!!errors.message}
        helperText={errors.message}
        fullWidth
        required
      />
    </>
  )
}
