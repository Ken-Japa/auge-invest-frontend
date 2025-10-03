import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const VisualizationWrapper = styled(Box)`
  flex: 1;
  display: flex;
  min-height: 100%;
  height: 100%;
  width: 100%;
  overflow: hidden;

  & > div {
    height: 100%;
  }
`

export const ContentPlaceholder = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-style: italic;

  text-align: center;
`
