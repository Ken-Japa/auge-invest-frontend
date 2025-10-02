import { ContentSkeleton } from '@/components/Feedback/Skeletons/ContentSkeleton'

export const SocialLoginSkeleton = () => {
  const commonSkeletonClasses = 'bg-[#ffffff0a] backdrop-blur-sm'

  return (
    <>
      <div className="divider-container">
        <div className="divider" />
        <ContentSkeleton type="text" textLines={1} className={`w-20 ${commonSkeletonClasses}`} />
        <div className="divider" />
      </div>

      <ContentSkeleton type="text" textLines={1} className={`h-12 mb-4 ${commonSkeletonClasses}`} />

      <ContentSkeleton type="text" textLines={1} className={`w-48 ${commonSkeletonClasses}`} />
    </>
  )
}
