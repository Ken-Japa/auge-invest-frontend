'use client';

import { OptimizedImage } from './index';
import { ImageProps } from 'next/image';

interface SpecializedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  className?: string;
}

// Avatar/Profile Image Component
export const AvatarImage = ({
  src,
  alt,
  size = 60,
  className = '',
  ...props
}: SpecializedImageProps & { size?: number }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={`rounded-full object-cover ${className}`}
    priority={false}
    sizes={`${size}px`}
    {...props}
  />
);

// Logo Component
export const LogoImage = ({
  src,
  alt = 'Company Logo',
  width = 60,
  height = 60,
  className = '',
  ...props
}: SpecializedImageProps & { width?: number; height?: number }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`object-contain ${className}`}
    priority={true}
    quality={90}
    sizes={`${width}px`}
    {...props}
  />
);

// Hero/Banner Image Component
export const HeroImage = ({
  src,
  alt,
  className = '',
  ...props
}: SpecializedImageProps) => (
  <OptimizedImage
    src={src}
    alt={alt}
    fill
    className={`object-cover ${className}`}
    priority={true}
    quality={85}
    sizes="100vw"
    {...props}
  />
);

// Card Image Component
export const CardImage = ({
  src,
  alt,
  className = '',
  ...props
}: SpecializedImageProps) => (
  <OptimizedImage
    src={src}
    alt={alt}
    fill
    className={`object-cover ${className}`}
    priority={false}
    quality={80}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    {...props}
  />
);

// Chart/Graph Image Component (for financial charts)
export const ChartImage = ({
  src,
  alt,
  className = '',
  ...props
}: SpecializedImageProps) => (
  <OptimizedImage
    src={src}
    alt={alt}
    fill
    className={`object-contain ${className}`}
    priority={false}
    quality={95}
    sizes="(max-width: 768px) 100vw, 80vw"
    {...props}
  />
);

// Company Stock Image/Icon
export const StockImage = ({
  src,
  alt,
  size = 40,
  className = '',
  ...props
}: SpecializedImageProps & { size?: number }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={size}
    height={size}
    className={`object-contain rounded ${className}`}
    priority={false}
    quality={85}
    sizes={`${size}px`}
    {...props}
  />
);