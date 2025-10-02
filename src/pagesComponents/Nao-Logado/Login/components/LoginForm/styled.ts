import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import { visitorColors } from '@/theme/palette/visitor'
import { spacing, transitions } from '@/theme/variables'

export const LoginFormStyled = styled('form')({
  position: 'relative',
  width: '100%',
  maxWidth: '400px',
  padding: spacing.xl,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '@media (max-width: 600px)': {
    padding: `${spacing.md} ${spacing.sm}`,
    maxWidth: '100%',
  },

  '& .form-header': {
    marginBottom: spacing.xl,
    width: '100%',
    textAlign: 'center',
  },

  '& .divider-container': {
    display: 'flex',
    alignItems: 'center',
    margin: `${spacing.xl} 0`,
    width: '100%',

    '& .divider': {
      flex: 1,
      borderBottom: `1px solid ${visitorColors.text}33`,
    },

    '& .divider-text': {
      margin: `0 ${spacing.md}`,
      color: `${visitorColors.text}b3`,
    },
  },

  '& .MuiTextField-root': {
    marginBottom: spacing.md,
    width: '100%',

    '& .MuiOutlinedInput-root': {
      color: visitorColors.text,
      transition: transitions.medium,

      '& fieldset': {
        borderColor: `${visitorColors.text}3d`,
      },

      '&:hover fieldset': {
        borderColor: `${visitorColors.text}80`,
      },

      '&.Mui-focused fieldset': {
        borderColor: visitorColors.primary,
      },
    },

    '& .MuiInputLabel-root': {
      color: `${visitorColors.text}b3`,
    },
  },

  '& .login-text': {
    marginTop: spacing.xl,
    fontFamily: '"Roboto Mono", monospace',
    letterSpacing: '0.5px',
    textAlign: 'center',
  },
})

export const SubmitButton = styled(Button)({
  marginTop: spacing.md,
  backgroundColor: visitorColors.primary,
  color: visitorColors.buttonText,
  transition: transitions.medium,

  '&:hover': {
    backgroundColor: visitorColors.buttonPrimary,
  },

  '&:disabled': {
    backgroundColor: `${visitorColors.primary}80`,
    color: `${visitorColors.buttonText}cc`,
  },
})

export const ForgotPasswordLink = styled('div')({
  width: '100%',
  textAlign: 'right',
  marginBottom: spacing.sm,

  '& a': {
    color: visitorColors.primary,
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: transitions.medium,

    '&:hover': {
      opacity: 0.8,
      textDecoration: 'underline',
    },
  },
})

export const RememberMeContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: spacing.md,

  '& .MuiCheckbox-root': {
    color: `${visitorColors.text}b3`,
    '&.Mui-checked': {
      color: visitorColors.primary,
    },
  },

  '& .MuiTypography-root': {
    color: `${visitorColors.text}b3`,
  },
})
