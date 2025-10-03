import { Box, Typography, Chip } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}))

export const TitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
  fontWeight: 700,
  color: theme.palette.primary.main,
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}))

export const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
  },
}))

export const AuthorDateTypography = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
}))

export const ReadTimeAndBlogLinkBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
  },
}))

export const ReadTimeTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}))

export const BlogLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.primary.main,
  textDecoration: 'none',
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    color: theme.palette.text.primary,
  },
}))

export const TagsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  justifyContent: 'center',
}))

export const TagChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.text.secondary,
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.action.hover,
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}))
