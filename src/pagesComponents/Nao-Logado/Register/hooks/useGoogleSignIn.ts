import { signIn } from 'next-auth/react'
import { type MouseEvent } from 'react'

export const useGoogleSignIn = (defaultRedirect: string) => {
  const handleGoogleClick = async (e: MouseEvent) => {
    e.preventDefault()
    try {
      const searchParams = new URLSearchParams(window.location.search)
      const callbackUrl = searchParams.get('callbackUrl') || defaultRedirect

      await signIn('google', {
        callbackUrl,
        redirect: true,
      })
    } catch (error) {
      console.error('Google sign-in error:', error)
    }
  }

  return { handleGoogleClick }
}
