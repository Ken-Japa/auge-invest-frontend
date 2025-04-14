"use client";

import { useEffect, useRef, useCallback, memo } from 'react';
import styles from './MatrixRainText.module.css';

interface Props {
    text: string;
    className?: string;
    fontSize?: string;
    onComplete?: () => void;
    triggerOnce?: boolean;
    charDelay?: number;
    animationDuration?: number;
}

export const MatrixRainText = memo(({
    text,
    className = '',
    fontSize,
    onComplete,
    triggerOnce = true,
    charDelay = 25,
    animationDuration = 0.2
}: Props) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const hasPlayedRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);

    const createCharSpan = useCallback((char: string) => {
        const charSpan = document.createElement('span');
        charSpan.style.opacity = '0';
        charSpan.style.position = 'relative';
        charSpan.style.display = 'inline-block';
        charSpan.textContent = char;
        if (fontSize) {
            charSpan.style.fontSize = fontSize;
        }
        return charSpan;
    }, [fontSize]);

    const animateChar = useCallback((charSpan: HTMLSpanElement, delay: number) => {
        const timeoutId = setTimeout(() => {
            charSpan.style.transition = `all ${animationDuration}s ease`;
            charSpan.style.opacity = '1';
            charSpan.style.animation = `matrixDrop ${animationDuration}s forwards`;
        }, delay);

        return timeoutId;
    }, [animationDuration]);

    useEffect(() => {
        if (!containerRef.current) return;

        if (triggerOnce && hasPlayedRef.current) {
            containerRef.current.innerHTML = text;
            return;
        }

        const container = containerRef.current;
        const words = text.split(' ');
        const timeouts: NodeJS.Timeout[] = [];

        container.innerHTML = '';

        animationFrameRef.current = requestAnimationFrame(() => {
            let totalDelay = 0;

            words.forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                const chars = word.split('');

                chars.forEach((char, charIndex) => {
                    const charSpan = createCharSpan(char);
                    wordSpan.appendChild(charSpan);
                    const timeoutId = animateChar(charSpan, totalDelay + charIndex * charDelay);
                    timeouts.push(timeoutId);
                });

                container.appendChild(wordSpan);
                if (wordIndex < words.length - 1) {
                    const space = document.createElement('span');
                    space.innerHTML = '&nbsp;';
                    container.appendChild(space);
                }

                totalDelay += chars.length * charDelay;
            });

            if (onComplete) {
                const completeTimeoutId = setTimeout(onComplete, totalDelay + (charDelay * 2));
                timeouts.push(completeTimeoutId);
            }

            hasPlayedRef.current = true;
        });

        // Cleanup function
        return () => {
            if (container) {
                container.innerHTML = '';
            }

            timeouts.forEach(clearTimeout);

            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [text, onComplete, triggerOnce, charDelay, createCharSpan, animateChar]);

    return (
        <span
            ref={containerRef}
            className={`${styles.container} ${className}`}
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        />
    );
});

MatrixRainText.displayName = 'MatrixRainText';