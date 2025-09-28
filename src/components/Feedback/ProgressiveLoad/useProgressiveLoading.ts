import { useEffect, useRef,useState } from "react";

interface UseProgressiveLoadingProps {
  threshold?: number;
  rootMargin?: string;
}

export const useProgressiveLoading = ({
  threshold = 0.1,
  rootMargin = "50px",
}: UseProgressiveLoadingProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { isVisible, elementRef };
};
