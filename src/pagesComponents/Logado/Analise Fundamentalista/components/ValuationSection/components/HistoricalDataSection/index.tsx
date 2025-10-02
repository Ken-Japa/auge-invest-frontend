import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Grid, IconButton } from '@mui/material'
import { FC } from 'react'

import { CustomAccordion } from '@/components/Core/Accordion'
import { NumberInput } from '@/components/Form/NumberInput'

import { HistoricalFCF } from '../../types'
import { HistoricalDataContainer } from './styled'

interface HistoricalDataSectionProps {
  historicalData: HistoricalFCF[]
  onAddYear: () => void
  onRemoveYear: (index: number) => void
  onDataChange: (index: number, value: number | null) => void
}

export const HistoricalDataSection: FC<HistoricalDataSectionProps> = ({
  historicalData,
  onAddYear,
  onRemoveYear,
  onDataChange,
}) => {
  return (
    <CustomAccordion
      title="Dados Históricos de FCF"
      customBackground="rgba(13, 149, 249, 0.15)"
      customBorderColor="rgba(13, 149, 249, 0.3)"
      customTitleColor="#FFFFFF"
      customContentBackground="rgba(13, 149, 249, 0.08)"
      variant="dark"
    >
      <HistoricalDataContainer>
        <Grid container spacing={2}>
          {historicalData.map((data, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <NumberInput
                  label={`FCF Ano -${data.year}`}
                  value={data.value}
                  onChange={(value) => onDataChange(index, value)}
                  fullWidth
                />
                <IconButton
                  onClick={() => onRemoveYear(index)}
                  size="small"
                  color="error"
                  sx={{
                    backgroundColor: 'rgba(211, 47, 47, 0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
          {historicalData.length < 5 && (
            <Grid item xs={12}>
              <IconButton
                onClick={onAddYear}
                color="primary"
                size="small"
                sx={{
                  backgroundColor: 'rgba(13, 149, 249, 0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(13, 149, 249, 0.1)',
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </HistoricalDataContainer>
    </CustomAccordion>
  )
}
