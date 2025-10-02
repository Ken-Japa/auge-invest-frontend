import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

import { FormHeaderSkeleton } from '../FormHeader/FormHeaderSkeleton'
import { SocialLoginSkeleton } from '../SocialLogin/SocialLoginSkeleton'
import { LoginFormStyled } from './styled'

export const LoginFormSkeleton = () => {
  const commonSkeletonClasses = 'bg-[#ffffff0a] backdrop-blur-sm'

  return (
    <LoginFormStyled>
      <FormHeaderSkeleton />

      {/* Email field */}
      <ContentSkeleton type="text" textLines={1} className={`mb-2 ${commonSkeletonClasses}`} />
      <ContentSkeleton type="text" textLines={1} className={`h-12 mb-4 ${commonSkeletonClasses}`} />

      {/* Password field */}
      <ContentSkeleton type="text" textLines={1} className={`mb-2 ${commonSkeletonClasses}`} />
      <ContentSkeleton type="text" textLines={1} className={`h-12 mb-4 ${commonSkeletonClasses}`} />

      {/* Forgot password */}
      <ContentSkeleton type="text" textLines={1} className={`w-32 ml-auto mb-2 ${commonSkeletonClasses}`} />

      {/* Remember me */}
      <ContentSkeleton type="text" textLines={1} className={`w-32 mb-4 ${commonSkeletonClasses}`} />

      {/* Login button */}
      <ContentSkeleton type="text" textLines={1} className={`h-12 mb-6 ${commonSkeletonClasses}`} />

      <SocialLoginSkeleton />
    </LoginFormStyled>
  )
}
