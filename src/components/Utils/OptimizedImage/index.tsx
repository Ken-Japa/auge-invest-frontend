"use client";

import Image, { ImageProps } from "next/image";
import { useState, useCallback } from "react";
import { ReactEventHandler } from "react";
import { ErrorContainer } from "./styled";

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    src: string;
    alt: string;
    className?: string;
    loadingClassName?: string;
    onImageError?: (error: Error) => void;
}

export const OptimizedImage = ({
    src,
    alt,
    className = '',
    loadingClassName = 'scale-110 blur-2xl grayscale',
    quality = 75,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    onImageError,
    priority,
    onError,
    ...props
}: OptimizedImageProps) => {
    const [isLoading, setLoading] = useState(!priority);
    const [hasError, setHasError] = useState(false);

    const handleLoad = useCallback(() => {
        setLoading(false);
    }, []);

    const handleError: ReactEventHandler<HTMLImageElement> = useCallback((event) => {
        setHasError(true);
        setLoading(false);
        onImageError?.(new Error("Image failed to load"));
        onError?.(event);
    }, [onImageError, onError]);

    if (hasError) {
        return (
            <ErrorContainer
                className={className}
                aspectRatio={props.width && props.height ? `${props.width}/${props.height}` : undefined}
            >
                <span className="text-gray-400">Failed to load image</span>
            </ErrorContainer>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            quality={quality}
            sizes={sizes}
            priority={priority}
            className={`
                duration-500 ease-in-out // Reduced from 700ms
                ${isLoading ? loadingClassName : 'scale-100 blur-0 grayscale-0'}
                ${className}
            `}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? undefined : "lazy"}
            {...props}
        />
    );
};