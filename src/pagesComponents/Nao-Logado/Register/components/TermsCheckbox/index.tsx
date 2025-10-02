import { Checkbox } from '@mui/material'
import { type FC } from 'react'

import { StyledFormControlLabel, StyledLink } from './styled'

interface TermsCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const TermsCheckbox: FC<TermsCheckboxProps> = ({ checked, onChange }) => (
  <StyledFormControlLabel
    control={
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        color="primary"
        id="terms-checkbox"
      />
    }
    label={
      <>
        Li e aceito os{' '}
        <StyledLink href="/visitante/termos-servicos" target="_blank" rel="noopener noreferrer">
          termos e condições
        </StyledLink>
      </>
    }
  />
)
