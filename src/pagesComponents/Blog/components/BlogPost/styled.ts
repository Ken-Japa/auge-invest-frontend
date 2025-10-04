import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { borderRadius, spacing, typography } from '@/theme/variables'

export const PostContainer = styled(Box)(
  ({ theme }) => `
  padding: ${spacing.xl} 0;
  background: ${theme.palette.background.default};
  min-height: 100vh;
  position: relative;
`,
)

export const BackgroundImageWrapper = styled(Box)`
  position: absolute;
  inset: 0;
  height: 100%;
`

export const MainContentWrapper = styled(motion.div)(
  ({ theme }) => `
  background: ${theme.palette.background.paper};
  backdrop-filter: blur(8px);
  border-radius: ${borderRadius.md};
  padding: ${spacing.xl};
  margin-top: ${spacing.lg};
  margin-bottom: ${spacing.xl};

  @media (min-width: 768px) {
    padding: ${spacing.xxl};
  }
`,
)
export const RelatedPostContentWrapper = styled(motion.div)(
  ({ theme }) => `
  background: ${theme.palette.background.paper};
  backdrop-filter: blur(8px);
  border-radius: ${borderRadius.lg};
  margin-bottom: ${spacing.md};

  @media (min-width: 768px) {
    padding: ${spacing.xxl};
  }
`,
)
export const BackLinkBox = styled(Box)(
  () => `
  display: flex;
  justify-content: center;
  margin-top: ${spacing.xxl};
`,
)

export const BackLink = styled(Link)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  &:hover {
    color: ${theme.palette.common.white};
  }
  transition: color 0.3s ease-in-out;
  font-size: ${typography.fontSizes.lg};
  font-weight: ${typography.fontWeights.medium};
  text-decoration: none;
`,
)

export const PostContent = styled(Box)(
  ({ theme }) => `
  color: ${theme.palette.text.primary};
  font-size: ${typography.fontSizes.md};
  line-height: 1.8;
  padding: ${spacing.xl};
  background: ${theme.palette.background.default};
  border: 1px solid ${theme.palette.divider};
  border-radius: ${borderRadius.md};
  backdrop-filter: blur(4px);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: ${typography.fontWeights.bold};
    line-height: 1.2;
    margin-top: ${spacing.xxl};
    margin-bottom: ${spacing.lg};
  }

  h1 {
    font-size: ${typography.fontSizes.xxl};
    color: ${theme.palette.primary.main};
    letter-spacing: -0.5px;
  }

  h2 {
    font-size: ${typography.fontSizes.xxl};
    color: ${theme.palette.primary.main};
    letter-spacing: -0.3px;
  }

  h3 {
    font-size: ${typography.fontSizes.xl};
    color: #ff6b6b; // Purple
    letter-spacing: -0.2px;
  }

  h4 {
    font-size: ${typography.fontSizes.xl};
    color: ${theme.palette.success.main};
    letter-spacing: -0.1px;
  }

  h5 {
    font-size: ${typography.fontSizes.xl};
    color: #9d8df1; // Mint
  }

  h6 {
    font-size: ${typography.fontSizes.lg};
    color: ${theme.palette.text.secondary};
  }

  p {
    margin-bottom: ${spacing.lg};
  }

  ul,
  ol {
    margin-bottom: ${spacing.lg};
    padding-left: ${spacing.xl};
  }

  li {
    margin-bottom: ${spacing.sm};
  }

  a {
    color: ${theme.palette.primary.main};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    border-left: 4px solid ${theme.palette.primary.main};
    padding-left: ${spacing.md};
    margin: ${spacing.lg} 0;
    font-style: italic;
  }

  code {
    background: ${theme.palette.divider};
    padding: ${spacing.xs} ${spacing.sm};
    border-radius: ${borderRadius.sm};
    font-size: ${typography.fontSizes.xs};
  }

  pre {
    background: ${theme.palette.divider};
    padding: ${spacing.md};
    border-radius: ${borderRadius.md};
    overflow-x: auto;
    margin: ${spacing.lg} 0;

    code {
      background: none;
      padding: 0;
    }
  }
`,
)
