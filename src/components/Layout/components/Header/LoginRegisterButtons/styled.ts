import { styled } from '@mui/material'
import { motion } from 'framer-motion'

export const ButtonsContainer = styled(motion.div)<{ fullwidth?: boolean }>`
  display: flex;
  flex-direction: ${({ fullwidth }) => (fullwidth ? 'column' : 'row')};
  gap: ${({ fullwidth }) => (fullwidth ? '0.5rem' : '1.25rem')};
`
