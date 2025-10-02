import { styled } from '@mui/material/styles'

import { PageTransition } from '@/components/Helpers/PageTransition'
import { visitorColors } from '@/theme/palette/visitor'
import { spacing } from '@/theme/variables'

export const SectionContact = styled('section')({
  minHeight: '100vh',
  width: '100%',
  position: 'relative',

  '& .background-image': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  },

  '& .content-wrapper': {
    position: 'relative',
    zIndex: 1,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    padding: `${spacing.xl} ${spacing.md}`,
    color: visitorColors.text,
  },

  '& .content-container': {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  },

  '& .form-container': {
    gap: spacing.xl,
    alignItems: 'flex-start',

    '@media (max-width: 900px)': {
      gap: spacing.lg,
    },
  },

  '& .title': {
    color: visitorColors.text,
  },

  '& .subtitle': {
    color: `${visitorColors.textSecondary} !important`,
  },
})

export const ContactForm = styled('form')({
  width: '100%',
  maxWidth: '600px',
  padding: '40px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '8px',
  backdropFilter: 'blur(10px)',

  '& .MuiTextField-root': {
    marginBottom: '16px',
  },

  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.7)',
    },
  },

  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: 'rgba(255, 255, 255, 0.9)',
    },
  },

  '& .MuiInputBase-input': {
    color: '#fff !important',
  },

  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(255, 255, 255, 0.5) !important',
    opacity: 1,
  },
})

export const StyledPageTransition = styled(PageTransition)({
  width: '100%',
})

export const BackgroundImageStyle = styled('div')<{ isLoaded: boolean }>(({ isLoaded }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  filter: !isLoaded ? 'grayscale(1)' : 'none',
  opacity: isLoaded ? 1 : 0.1,
  transition: 'filter 0.5s ease-in-out, opacity 0.5s ease-in-out',
}))
