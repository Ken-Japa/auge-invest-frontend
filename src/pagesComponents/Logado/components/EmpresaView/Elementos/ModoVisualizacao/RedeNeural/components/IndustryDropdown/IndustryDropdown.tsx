import { InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

import { ColorBox, MenuItemContent, StyledFormControl } from './styled'

interface IndustryDropdownProps {
  industries: { id: string; label: string; color: string }[]
  onSelectIndustry: (industryId: string) => void
  selectedIndustryId: string | null
}

export const IndustryDropdown: React.FC<IndustryDropdownProps> = ({
  industries,
  onSelectIndustry,
  selectedIndustryId,
}) => {
  return (
    <StyledFormControl>
      <InputLabel id="industry-select-label">Indústrias:</InputLabel>
      <Select
        labelId="industry-select-label"
        value={selectedIndustryId || ''}
        label="Select Industry"
        aria-label="Selecionar Indústria"
        onChange={(event) => onSelectIndustry(event.target.value as string)}
      >
        <MenuItem value="">Todas</MenuItem>
        {industries.map((industry) => (
          <MenuItem key={industry.id} value={industry.id}>
            <MenuItemContent>
              <ColorBox sx={{ bgcolor: industry.color }} aria-label={`Cor da indústria ${industry.label}`} />
              {industry.label}
            </MenuItemContent>
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  )
}
