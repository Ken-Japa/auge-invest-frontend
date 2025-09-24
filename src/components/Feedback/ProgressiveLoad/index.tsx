"use client";
import { ReactNode, useEffect, useState } from 'react';
import { useProgressiveLoading } from './useProgressiveLoading';

interface ProgressiveLoadProps {
    children: ReactNode;
    threshold?: number;
    rootMargin?: string;
    className?: string;
    delay?: number;
}

export const ProgressiveLoad = ({
    children,
    threshold,
    rootMargin,
    className = '',
    delay = 0
}: ProgressiveLoadProps) => {
    const { isVisible, elementRef } = useProgressiveLoading({ threshold, rootMargin });
    const [shouldRender, setShouldRender] = useState(!delay);

    useEffect(() => {
        if (isVisible && delay) {
            const timer = setTimeout(() => {
                setShouldRender(true);
            }, delay * 1000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, delay]);

    return (
        <div ref={elementRef} className={className}>
            {(isVisible && (!delay || shouldRender)) && children}
        </div>
    );
};