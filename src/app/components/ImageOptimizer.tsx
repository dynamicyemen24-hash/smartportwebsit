import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholderColor?: string;
  quality?: 'low' | 'medium' | 'high';
  format?: 'webp' | 'avif' | 'jpg';
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// Helper to generate optimized image URL (for services like Cloudinary, Imgix, etc.)
function getOptimizedUrl(
  src: string,
  quality: 'low' | 'medium' | 'high',
  format: 'webp' | 'avif' | 'jpg',
): string {
  // For Unsplash images, add optimization params
  if (src.includes('unsplash.com')) {
    const qualityMap: Record<string, string> = { low: '40', medium: '70', high: '90' };
    const formatMap: Record<string, string> = { webp: 'webp', avif: 'avif', jpg: 'jpg' };
    return `${src}&q=${qualityMap[quality]}&fm=${formatMap[format]}`;
  }

  // For local images or other sources, return as-is
  return src;
}

export default function ImageOptimizer({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderColor = '#f3f4f6',
  quality = 'medium',
  format = 'webp',
  sizes,
  onLoad,
  onError,
}: ImageOptimizerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const optimizedSrc = getOptimizedUrl(src, quality, format);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    // Fallback to original src
    if (src !== optimizedSrc) {
      imgRef.current!.src = src;
    } else {
      setHasError(true);
      onError?.();
    }
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, backgroundColor: placeholderColor }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">فشل تحميل الصورة</span>
        </div>
      )}

      {/* Optimized Image with srcset */}
      {isInView && !hasError && (
        <motion.picture>
          {/* AVIF format (best compression) */}
          <source
            type="image/avif"
            srcSet={`${getOptimizedUrl(src, quality, 'avif')} 300w,
                     ${getOptimizedUrl(src, 'high', 'avif')} 600w,
                     ${getOptimizedUrl(src, 'high', 'avif')} 1200w`}
            sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          />
          {/* WebP format (good compression) */}
          <source
            type="image/webp"
            srcSet={`${getOptimizedUrl(src, quality, 'webp')} 300w,
                     ${getOptimizedUrl(src, 'high', 'webp')} 600w,
                     ${getOptimizedUrl(src, 'high', 'webp')} 1200w`}
            sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          />
          {/* Fallback JPG */}
          <motion.img
            src={optimizedSrc}
            alt={alt}
            className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.picture>
      )}
    </div>
  );
}

// Preconnect to image CDN for faster loading
export function ImagePreconnect({ cdnUrl }: { cdnUrl: string }) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = cdnUrl;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [cdnUrl]);

  return null;
}
