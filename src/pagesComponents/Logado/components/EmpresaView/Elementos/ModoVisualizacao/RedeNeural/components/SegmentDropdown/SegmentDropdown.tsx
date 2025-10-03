import { Select, MenuItem, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import {
  IndustryColorBox,
  SegmentDropdownContainer,
  StyledFormControl,
  StyledListSubheader,
  ToggleIconButton,
} from './styled'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface SegmentDropdownProps {
  segmentsByIndustry: {
    industryId: string
    industryLabel: string
    color: string
    segments: { id: string; label: string }[]
  }[]
  onSelectSegment: (segmentId: string) => void
  selectedSegmentId: string | null
}

export const SegmentDropdown: React.FC<SegmentDropdownProps> = ({
  segmentsByIndustry,
  onSelectSegment,
  selectedSegmentId,
}) => {
  const [openIndustries, setOpenIndustries] = useState<string[]>([])

  const handleToggleIndustry = (industryId: string) => {
    setOpenIndustries((prev) =>
      prev.includes(industryId) ? prev.filter((id) => id !== industryId) : [...prev, industryId],
    )
  }

  return (
    <SegmentDropdownContainer>
      <StyledFormControl>
        <InputLabel id="segment-select-label">Segmentos:</InputLabel>
        <Select
          labelId="segment-select-label"
          value={selectedSegmentId || ''}
          label="Selecionar Segmento"
          aria-label="Selecionar Segmento"
          onChange={(e) => {
            onSelectSegment(e.target.value as string)
          }}
        >
          <MenuItem value="">Todos</MenuItem>
          {segmentsByIndustry.map((industryGroup) => [
            <StyledListSubheader key={industryGroup.industryId}>
              <ToggleIconButton
                size="small"
                onClick={() => handleToggleIndustry(industryGroup.industryId)}
                aria-label={
                  openIndustries.includes(industryGroup.industryId) ? 'Collapse industry' : 'Expand industry'
                }
              >
                {openIndustries.includes(industryGroup.industryId) ? (
                  <ExpandMoreIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </ToggleIconButton>
              <IndustryColorBox
                sx={{ backgroundColor: industryGroup.color }}
                aria-label={`Color for ${industryGroup.industryLabel}`}
              />
              {industryGroup.industryLabel}
            </StyledListSubheader>,
            ...(openIndustries.includes(industryGroup.industryId)
              ? industryGroup.segments.map((segment) => (
                  <MenuItem key={segment.id} value={segment.id} sx={{ pl: 4 }}>
                    {segment.label}
                  </MenuItem>
                ))
              : []),
          ])}
        </Select>
      </StyledFormControl>
    </SegmentDropdownContainer>
  )
}
