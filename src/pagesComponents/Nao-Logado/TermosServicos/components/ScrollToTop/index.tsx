import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Fade } from '@mui/material'

import { ScrollButton } from './styled'

interface ScrollToTopProps {
  show: boolean
  onClick: () => void
}

export const ScrollToTop = ({ show, onClick }: ScrollToTopProps) => {
  return (
    <Fade in={show}>
      <ScrollButton onClick={onClick} aria-label="Voltar ao topo" style={{ position: 'fixed' }}>
        <ArrowUpwardIcon />
      </ScrollButton>
    </Fade>
  )
}
