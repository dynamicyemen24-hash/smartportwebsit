import { motion } from 'motion/react';
import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
  type LazyExoticComponent,
} from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LazyComponentProps {
  component: LazyExoticComponent<ComponentType<any>>;
  fallback?: React.ReactNode;
  showSpinner?: boolean;
  spinnerSize?: 'sm' | 'md' | 'lg';
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  [key: string]: any;
}

export default function LazyComponent({
  component: Component,
  fallback,
  showSpinner = true,
  spinnerSize = 'md',
  delay = 0,
  threshold = 0.1,
  rootMargin = '100px',
  ...props
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [ref, delay, rootMargin, threshold]);

  const defaultFallback = showSpinner ? (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <LoadingSpinner size={spinnerSize} />
    </div>
  ) : (
    fallback || null
  );

  return (
    <div ref={setRef as React.RefCallback<HTMLDivElement>} className="w-full">
      {isVisible ? (
        <Suspense fallback={defaultFallback}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Component {...props} />
          </motion.div>
        </Suspense>
      ) : (
        defaultFallback
      )}
    </div>
  );
}

// Helper function to create lazy components with dynamic imports
export function createLazyComponent<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
) {
  return lazy(importFunc);
}

// Pre-configured lazy loaders for common components
export const LazySection = (importFunc: () => Promise<{ default: ComponentType<any> }>) =>
  lazy(importFunc);

// Hook for manual lazy loading control
export function useLazyLoad(threshold = 0.1, rootMargin = '100px') {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return { isVisible, ref: setRef as React.RefCallback<HTMLElement> };
}
