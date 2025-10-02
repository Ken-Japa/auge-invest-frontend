import { Button, DialogActions, DialogContent } from '@mui/material'

import { StyledDialog, StyledDialogTitle } from '@/components/Core/Dialog'

import {
  CommonErrorsSection,
  DataLocationSection,
  DataSourcesSection,
  MetricsInterpretationSection,
  StartSection,
} from './components'

interface HelpDialogProps {
  open: boolean
  onClose: () => void
}

export const HelpDialog = ({ open, onClose }: HelpDialogProps) => {
  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <StyledDialogTitle>Guia de Análise Fundamentalista</StyledDialogTitle>
      <DialogContent sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <StartSection />
        <DataSourcesSection />
        <DataLocationSection />
        <CommonErrorsSection />
        <MetricsInterpretationSection />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}
