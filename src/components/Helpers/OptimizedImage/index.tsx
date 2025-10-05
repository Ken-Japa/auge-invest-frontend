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

/**
 * @typedef {object} OptimizedImageProps
 * @property {string} src - O caminho da imagem.
 * @property {string} alt - O texto alternativo da imagem para acessibilidade.
 * @property {string} [className] - Classes CSS adicionais para o componente Image.
 * @property {string} [loadingClassName] - Classes CSS aplicadas durante o estado de carregamento da imagem. Padrão é 'scale-110 blur-2xl grayscale'.
 * @property {(error: Error) => void} [onImageError] - Callback disparado se a imagem falhar ao carregar.
 * @property {'high' | 'low' | 'auto'} [fetchPriority] - Prioridade de busca da imagem. Herda de `next/image`.
 * @property {number} [quality] - Qualidade da imagem (0-100). Padrão é 90. Herda de `next/image`.
 * @property {string} [sizes] - String de tamanhos para a imagem responsiva. Padrão é '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'. Herda de `next/image`.
 * @property {boolean} [priority] - Se a imagem deve ser carregada com alta prioridade. Padrão é `false`. Herda de `next/image`.
 * @property {ReactEventHandler<HTMLImageElement>} [onError] - Manipulador de erro nativo do elemento `<img>`. Herda de `next/image`.
 */

/**
 * Componente OptimizedImage que envolve o `next/image` para fornecer carregamento otimizado,
 * tratamento de erros e estados de carregamento personalizados.
 *
 * @param {OptimizedImageProps} props - As propriedades do componente.
 * @returns {JSX.Element} O componente Image otimizado renderizado.
 */
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
