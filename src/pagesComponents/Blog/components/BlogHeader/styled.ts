import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const HeaderContainer = styled(Box)`
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
  text-align: center;
`

export const HeaderContent = styled(Box)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;

  h2 {
    margin: 0 auto;
  }
`

export const HeaderTitle = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  color: #0d95f9;
  margin-bottom: 3rem;

  @media (min-width: 900px) {
    font-size: 3rem;
  }
`

export const HeaderSubtitle = styled(Typography)`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 32rem;
  margin: 0 auto;

  @media (min-width: 900px) {
    font-size: 1.25rem;
  }
`
