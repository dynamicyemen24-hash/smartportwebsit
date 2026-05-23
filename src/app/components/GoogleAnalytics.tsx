import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (command: string, targetId: string, config?: Record<string, any>) => void;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
  ga4MeasurementId?: string; // For GA4 specifically
}

// Check if we're in development mode
const isDevelopment =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export default function GoogleAnalytics({ measurementId, ga4MeasurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Don't load in development
    if (isDevelopment) {
      return;
    }

    const id = ga4MeasurementId || measurementId;

    // Create script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;

    // Add to document
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer!.push(args);
    };
    window.gtag('js', new Date().toISOString());
    window.gtag('config', id, {
      send_page_view: true,
    });

    return () => {
      // Clean up (optional - usually not needed for analytics)
    };
  }, [measurementId, ga4MeasurementId]);

  return null;
}

// Helper functions for tracking events
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Common event tracking functions
export const trackPageView = (path: string, title?: string) => {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
  });
};

export const trackClick = (
  element: string,
  label: string,
  additionalParams?: Record<string, any>,
) => {
  trackEvent('click', {
    element,
    label,
    ...additionalParams,
  });
};

export const trackFormSubmit = (
  formName: string,
  success: boolean,
  additionalParams?: Record<string, any>,
) => {
  trackEvent('form_submit', {
    form_name: formName,
    success,
    ...additionalParams,
  });
};

export const trackPhoneClick = (phoneNumber: string) => {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
  });
};

export const trackEmailClick = (email: string) => {
  trackEvent('email_click', {
    email,
  });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    depth,
  });
};

export const trackVideoPlay = (videoTitle: string, duration?: number) => {
  trackEvent('video_play', {
    video_title: videoTitle,
    duration,
  });
};

export const trackDownload = (fileName: string, fileSize?: string) => {
  trackEvent('download', {
    file_name: fileName,
    file_size: fileSize,
  });
};

export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

// Hook for easy event tracking
export function useAnalytics() {
  const track = (eventName: string, params?: Record<string, any>) => {
    trackEvent(eventName, params);
  };

  return {
    track,
    trackPageView: (path: string, title?: string) => trackPageView(path, title),
    trackClick: (element: string, label: string, params?: Record<string, any>) =>
      trackClick(element, label, params),
    trackFormSubmit: (formName: string, success: boolean, params?: Record<string, any>) =>
      trackFormSubmit(formName, success, params),
    trackPhoneClick: (phoneNumber: string) => trackPhoneClick(phoneNumber),
    trackEmailClick: (email: string) => trackEmailClick(email),
    trackScrollDepth: (depth: number) => trackScrollDepth(depth),
    trackVideoPlay: (videoTitle: string, duration?: number) => trackVideoPlay(videoTitle, duration),
    trackDownload: (fileName: string, fileSize?: string) => trackDownload(fileName, fileSize),
    trackSearch: (searchTerm: string, resultsCount?: number) =>
      trackSearch(searchTerm, resultsCount),
  };
}

// Custom hook for tracking page views on route changes
export function usePageTracking(measurementId: string) {
  useEffect(() => {
    if (isDevelopment) return;

    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    // For hash-based routing
    const handleHashChange = () => {
      handleRouteChange(window.location.hash || '/');
    };

    window.addEventListener('hashchange', handleHashChange);

    // Track initial page view
    handleRouteChange(window.location.pathname + window.location.search);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [measurementId]);
}
