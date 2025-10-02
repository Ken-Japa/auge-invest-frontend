'use client'

import Image, { ImageProps } from 'next/image'
import { useCallback, useState } from 'react'
import { ReactEventHandler } from 'react'

import { ErrorContainer } from './styled'

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt' | 'fetchPriority'> {
  src: string
  alt: string
  className?: string
  loadingClassName?: string
  onImageError?: (error: Error) => void
  fetchPriority?: 'high' | 'low' | 'auto'
}

export const OptimizedImage = ({
  src,
  alt,
  className = '',
  loadingClassName = 'scale-110 blur-2xl grayscale',
  quality = 90,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onImageError,
  priority = false, // Default to false if not provided
  fetchPriority,
  onError,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setLoading] = useState(!priority)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setLoading(false)
    if (props.onLoad) {
      // @ts-expect-error - Call the onLoad prop if it exists
      props.onLoad()
    }
  }, [props])

  const handleError: ReactEventHandler<HTMLImageElement> = useCallback(
    (event) => {
      setHasError(true)
      setLoading(false)
      onImageError?.(new Error('Image failed to load'))
      onError?.(event)
    },
    [onImageError, onError],
  )

  if (hasError) {
    return (
      <ErrorContainer
        className={className}
        aspectRatio={props.width && props.height ? `${props.width}/${props.height}` : undefined}
      >
        <span className="text-gray-400">Failed to load image</span>
      </ErrorContainer>
    )
  }

  const { loading, onLoad, ...restProps } = props as any

  return (
    <Image
      src={src}
      alt={alt}
      quality={quality}
      sizes={sizes}
      priority={priority}
      fetchPriority={fetchPriority}
      className={`
                ${isLoading && !priority ? loadingClassName : 'scale-100 blur-0 grayscale-0'}
                ${className}
            `}
      onLoad={handleLoad}
      onError={handleError}
      {...restProps}
    />
  )
}
