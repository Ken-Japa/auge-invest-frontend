import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { borderRadius } from '@/theme/variables'

export const PostContainer = styled(Box)`
  padding: 4rem 0;
  background: #111111;
  min-height: 100vh;
  position: relative;
`

export const BackgroundImageWrapper = styled(Box)`
  position: absolute;
  inset: 0;
  height: 100%;
`

export const MainContentWrapper = styled(motion.div)`
  background: rgba(26, 32, 44, 0.75);
  backdrop-filter: blur(8px);
  border-radius: ${borderRadius.md};
  padding: 2rem;
  margin-top: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`
export const RelatedPostContentWrapper = styled(motion.div)`
  background: rgba(26, 32, 44, 0.2);
  backdrop-filter: blur(8px);
  border-radius: ${borderRadius.lg};
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`
export const BackLinkBox = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

export const BackLink = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.main};
  &:hover {
    color: ${({ theme }) => theme.palette.common.white};
  }
  transition: color 0.3s ease-in-out;
  font-size: 1.125rem;
  font-weight: 500;
  text-decoration: none;
`

export const PostContent = styled(Box)`
  color: #fff;
  font-size: 1.1rem;
  line-height: 1.8;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.25);
  border: ${({ theme }) => `1px solid ${theme.palette.divider}`};
  border-radius: ${borderRadius.md};
  backdrop-filter: blur(4px);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 3rem;
    color: #0d95f9;
    letter-spacing: -0.5px;
  }

  h2 {
    font-size: 2.2rem;
    color: #0d95f9; // Teal
    letter-spacing: -0.3px;
  }

  h3 {
    font-size: 1.75rem;
    color: #ff6b6b; // Purple
    letter-spacing: -0.2px;
  }

  h4 {
    font-size: 1.75rem;
    color: #4ecdc4; // Coral
    letter-spacing: -0.1px;
  }

  h5 {
    font-size: 1.5rem;
    color: #9d8df1; // Mint
  }

  h6 {
    font-size: 1.25rem;
    color: #95a5a6; // Gray blue
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.palette.primary.main};
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
  }

  code {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: ${borderRadius.sm};
    font-size: 0.9em;
  }

  pre {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: ${borderRadius.md};
    overflow-x: auto;
    margin: 1.5rem 0;

    code {
      background: none;
      padding: 0;
    }
  }
`
