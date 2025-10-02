import GoogleIcon from '@mui/icons-material/Google'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'

import { SocialLoginSkeleton } from './SocialLoginSkeleton'
import { GoogleButton, RegisterLink } from './styled'

interface SocialLoginProps {
  handleGoogleSignIn: () => Promise<void>
  isLoading?: boolean
}

export const SocialLogin = ({ handleGoogleSignIn, isLoading }: SocialLoginProps) => {
  const [isSigningIn, setIsSigningIn] = useState(false)

  if (isLoading) {
    return <SocialLoginSkeleton />
  }

  const handleGoogleClick = async () => {
    if (isSigningIn) return // Prevent multiple clicks

    try {
      setIsSigningIn(true)
      await handleGoogleSignIn()
    } catch (error) {
      console.error('Failed to sign in with Google:', error)
    } finally {
      setIsSigningIn(false)
    }
  }

  return (
    <>
      <div className="divider-container">
        <div className="divider" />
        <span className="divider-text">ou</span>
        <div className="divider" />
      </div>

      <GoogleButton
        variant="outlined"
        fullWidth
        size="large"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleClick}
        disabled={isSigningIn}
        aria-label="Continuar com Google"
      >
        {isSigningIn ? 'Conectando...' : 'Continuar com Google'}
      </GoogleButton>

      <Typography component="p" className="login-text text-white" variant="body1">
        Não tem uma conta?{' '}
        <RegisterLink>
          <Link href="/register">Registre-se</Link>
        </RegisterLink>
      </Typography>
    </>
  )
}
