import { Box, Chip } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  margin: theme.spacing(1, 0, 2, 0),
  justifyContent: 'center',
}))

export const InfoChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
  color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.text.primary,
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1),
  },
}))

export const EsgScoreChip = styled(Chip)<{ esgscore: number }>(({ theme, esgscore }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1),
  backgroundColor:
    esgscore > 80
      ? 'rgba(46, 125, 50, 0.1)'
      : esgscore > 60
        ? 'rgba(2, 136, 209, 0.1)'
        : 'rgba(237, 108, 2, 0.1)',
  borderColor:
    esgscore > 80
      ? 'rgba(46, 125, 50, 0.5)'
      : esgscore > 60
        ? 'rgba(2, 136, 209, 0.5)'
        : 'rgba(237, 108, 2, 0.5)',
  color: esgscore > 80 ? '#2e7d32' : esgscore > 60 ? '#0288d1' : '#ed6c02',
  '& .MuiChip-icon': {
    color: 'inherit', // This ensures the icon inherits the color from the chip
  },
}))

export const ValorMercadoChip = styled(InfoChip)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.15)' : 'rgba(25, 118, 210, 0.1)',
  borderColor: theme.palette.mode === 'dark' ? 'rgba(25, 118, 210, 0.5)' : 'rgba(25, 118, 210, 0.3)',
  padding: theme.spacing(1.5),
  '& .MuiChip-label': {
    fontWeight: 'bold',
    padding: theme.spacing(0, 2),
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.primary.dark,
  },
}))
