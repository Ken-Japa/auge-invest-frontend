import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

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
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="industry-select-label">Indústrias:</InputLabel>
      <Select
        labelId="industry-select-label"
        value={selectedIndustryId || ''}
        label="Select Industry"
        onChange={(event) => onSelectIndustry(event.target.value as string)}
      >
        <MenuItem value="">Todas</MenuItem>
        {industries.map((industry) => (
          <MenuItem key={industry.id} value={industry.id}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: industry.color,
                  mr: 1,
                }}
              />
              {industry.label}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
