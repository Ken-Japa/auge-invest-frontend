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
        if (props.onLoad) {
            // @ts-ignore - Call the onLoad prop if it exists
            props.onLoad();
        }
    }, [props]);

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
                role="img"
                aria-label={`Failed to load image: ${alt}`}
            >
                <svg 
                    className="w-8 h-8 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                    />
                </svg>
                <span className="sr-only">Image failed to load: {alt}</span>
            </ErrorContainer>
        );
    }

    const { loading, onLoad, ...restProps } = props as any;

    return (
        <Image
            src={src}
            alt={alt}
            quality={quality}
            sizes={sizes}
            priority={priority}
            className={`
                duration-300 ease-in-out // Reduced from 500ms for better performance
                ${isLoading ? loadingClassName : 'scale-100 blur-0 grayscale-0'}
                ${className}
            `}
            onLoad={handleLoad}
            onError={handleError}

            {...restProps}
        />
    );
};