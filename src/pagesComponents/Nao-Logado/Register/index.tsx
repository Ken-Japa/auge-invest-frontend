'use client'

import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/navigation'
import { lazy, useEffect, useState } from 'react'

import { ErrorBoundary } from '@/components/Feedback/ErrorBoundary'
import { SuspenseWrapper } from '@/components/Feedback/SuspenseWrapper'
import { OptimizedImage } from '@/components/Helpers/OptimizedImage'
import { PageTransition } from '@/components/Helpers/PageTransition'

import { BlockTimer } from './components/BlockTimer'
import { RegisterFormSkeleton } from './components/RegisterForm/RegisterFormSkeleton'
import { useBlockTimer } from './hooks/useBlockTimer'
import { useGoogleSignIn } from './hooks/useGoogleSignIn'
import { useRegisterForm } from './hooks/useRegisterForm'
import { RegisterPageContainer, StyledCloseButton } from './styled'

const BLOCK_DURATION = 10 * 60 * 1000
const DEFAULT_REDIRECT = '/visao-economia'

const IMAGE_PROPS = {
  src: '/assets/images/background/REGISTER.webp',
  alt: 'Fundo da página de Registro',
  fill: true,
  priority: true,
  fetchPriority: 'high',
  sizes: '(max-width: 600px) 100vw, (max-width: 900px) 900px, 1200px',
  className: 'object-cover',
  quality: 60,
} as const

const RegisterFormContent = lazy(() =>
  import('./components/RegisterForm').then((mod) => ({
    default: mod.RegisterFormContent,
  })),
)

export const Register = () => {
  const router = useRouter()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isComponentMounted, setIsComponentMounted] = useState(false)
  const { isBlocked, blockTimer, handleBlockUser } = useBlockTimer(BLOCK_DURATION)
  const { formData, errors, acceptedTerms, isSubmitting, setAcceptedTerms, handleChange, handleSubmit } =
    useRegisterForm(handleBlockUser)
  const { handleGoogleClick } = useGoogleSignIn(DEFAULT_REDIRECT)

  // Preload critical resources
  useEffect(() => {
    setIsComponentMounted(true)

    const preloadResources = async () => {
      const formPromise = import('./components/RegisterForm')
      const headerPromise = import('./components/Header')
      const fieldsPromise = import('./components/FormFields')

      await Promise.all([formPromise, headerPromise, fieldsPromise])
    }

    preloadResources().catch(console.error)

    const imgPreload = new Image()
    imgPreload.src = IMAGE_PROPS.src

    return () => {
      imgPreload.onload = null
      imgPreload.onerror = null
    }
  }, [])

  const handleClose = () => {
    try {
      router.back()
    } catch {
      router.push('/')
    }
  }

  return (
    <PageTransition direction="up" duration={0.3} distance={20} className="w-full">
      <ErrorBoundary>
        <RegisterPageContainer>
          <div className="background-image">
            <OptimizedImage
              {...IMAGE_PROPS}
              onLoad={() => {
                setImageLoaded(true)
              }}
              style={{
                opacity: imageLoaded ? 1 : 0.3,
                transition: 'opacity 0.2s ease-in-out',
                transform: 'translateZ(0)',
                willChange: 'opacity',
              }}
            />
          </div>
          <div className="content">
            <StyledCloseButton onClick={handleClose} aria-label="Fechar">
              <CloseIcon />
            </StyledCloseButton>

            <SuspenseWrapper fallback={<RegisterFormSkeleton />}>
              {isBlocked ? (
                <BlockTimer seconds={blockTimer} />
              ) : (
                <RegisterFormContent
                  formData={formData}
                  errors={errors}
                  acceptedTerms={acceptedTerms}
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                  onTermsChange={setAcceptedTerms}
                  onGoogleClick={handleGoogleClick}
                  isLoading={!isComponentMounted || isSubmitting}
                />
              )}
            </SuspenseWrapper>
          </div>
        </RegisterPageContainer>
      </ErrorBoundary>
    </PageTransition>
  )
}

export default Register
