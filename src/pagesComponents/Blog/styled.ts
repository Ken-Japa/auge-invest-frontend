import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const BlogContainer = styled(Box)`
  position: relative;
  width: 100%;
  min-height: auto;
  display: flex;
  flex-direction: column;
  z-index: 0;
  overflow: hidden;

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    filter: brightness(0.6);
  }
`

export const BlogContent = styled(Box)`
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 8rem);

  @media (max-width: 900px) {
    padding: 2rem 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    min-height: calc(100vh - 4rem);
  }
`
