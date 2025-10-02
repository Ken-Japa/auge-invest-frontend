import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

import { FormFieldsSkeleton } from '../FormFields/FormFieldsSkeleton'
import { HeaderSkeleton } from '../Header/HeaderSkeleton'

import { RegisterFormStyled } from './styled'

const commonSkeletonProps = {
  type: 'text' as const,
  textLines: 1,
  className: 'bg-[#ffffff0a] backdrop-blur-sm',
}

export const RegisterFormSkeleton = () => (
  <RegisterFormStyled>
    <HeaderSkeleton />
    <FormFieldsSkeleton />

    <ContentSkeleton {...commonSkeletonProps} className={`${commonSkeletonProps.className} h-10 w-full`} />

    <ContentSkeleton
      {...commonSkeletonProps}
      className={`${commonSkeletonProps.className} h-8 w-48 mx-auto mt-4`}
    />

    <ContentSkeleton
      {...commonSkeletonProps}
      className={`${commonSkeletonProps.className} h-12 w-full mt-4`}
    />

    <div className="divider-container">
      <div className="divider" />
      <ContentSkeleton {...commonSkeletonProps} className={`${commonSkeletonProps.className} w-8`} />
      <div className="divider" />
    </div>

    <ContentSkeleton {...commonSkeletonProps} className={`${commonSkeletonProps.className} h-12 w-full`} />
  </RegisterFormStyled>
)
