import InfoIcon from '@mui/icons-material/Info'
import { IconButton, Tooltip } from '@mui/material'

import { SectionContainer, SectionTitle } from '../styled'
import { FormSectionProps } from '../types/types'

import { StyledDivider } from './styled'

export const FormSection = ({ title, description, children }: FormSectionProps) => (
  <SectionContainer item xs={12}>
    <SectionTitle variant="h4" gutterBottom>
      {title}
      <Tooltip title={description}>
        <IconButton size="small">
          <InfoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </SectionTitle>
    {children}
    <StyledDivider />
  </SectionContainer>
)
