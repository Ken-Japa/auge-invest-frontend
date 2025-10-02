import SaveIcon from '@mui/icons-material/Save'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { FC, useState } from 'react'

import { DadosAnaliseFundamental, MetricasCalculadas } from '../../types'
import { SensitivityResults, ValuationResults } from '../ValuationSection/types'
import { SaveReportContainer } from './styled'
import { GenerateReportParams } from './utils/types'

interface SaveReportSectionProps {
  onSave: (params: GenerateReportParams) => void
  isEnabled: boolean
  fundamentalData: DadosAnaliseFundamental
  valuationResults: ValuationResults | null
  sensitivityResults: SensitivityResults | null
  metricsResults?: MetricasCalculadas
}

export interface SaveReportOptions {
  companyName: string
  showFormulas: boolean
  showDescriptions: boolean
  showCalculations: boolean
  format: 'markdown' | 'pdf'
}

export const SaveReportSection: FC<SaveReportSectionProps> = ({
  onSave,
  isEnabled,
  fundamentalData,
  valuationResults,
  sensitivityResults,
  metricsResults,
}) => {
  const [options, setOptions] = useState<SaveReportOptions>({
    companyName: '',
    showFormulas: false,
    showDescriptions: false,
    showCalculations: false,
    format: 'pdf',
  })

  const handleSave = () => {
    const currentYear = new Date().getFullYear()
    const reportName = options.companyName.trim()
      ? `Análise Fundamentalista - ${options.companyName} - ${currentYear}`
      : `Análise Fundamentalista - ${currentYear}`

    const reportParams: GenerateReportParams = {
      options: { ...options, companyName: reportName },
      fundamentalData,
      valuationResults,
      sensitivityResults,
      metricsResults,
    }

    onSave(reportParams)
  }

  return (
    <SaveReportContainer>
      <Typography variant="h6" gutterBottom>
        Salvar Relatório
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Nome da Empresa"
          value={options.companyName}
          onChange={(e) => setOptions({ ...options, companyName: e.target.value })}
          disabled={!isEnabled}
        />
      </Box>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={options.showFormulas}
              onChange={(e) => setOptions({ ...options, showFormulas: e.target.checked })}
              disabled={!isEnabled}
            />
          }
          label="Mostrar fórmulas utilizadas"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={options.showDescriptions}
              onChange={(e) => setOptions({ ...options, showDescriptions: e.target.checked })}
              disabled={!isEnabled}
            />
          }
          label="Adicionar descrição das métricas"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={options.showCalculations}
              onChange={(e) => setOptions({ ...options, showCalculations: e.target.checked })}
              disabled={!isEnabled}
            />
          }
          label="Mostrar cálculos detalhados"
        />
      </FormGroup>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={!isEnabled}
          fullWidth
        >
          Salvar Relatório
        </Button>
      </Box>
      <FormControl fullWidth sx={{ my: 4 }}>
        <InputLabel>Formato do Arquivo</InputLabel>
        <Select
          value={options.format}
          label="Formato do Arquivo"
          onChange={(e) => setOptions({ ...options, format: e.target.value as SaveReportOptions['format'] })}
          disabled={!isEnabled}
        >
          <MenuItem value="markdown">Markdown (.md)</MenuItem>
          <MenuItem value="pdf">PDF (.pdf)</MenuItem>
        </Select>
      </FormControl>
    </SaveReportContainer>
  )
}
