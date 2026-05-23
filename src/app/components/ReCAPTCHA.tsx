import { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface ReCAPTCHAProps {
  siteKey: string;
  action: string;
  onVerify: (token: string) => void;
  onError?: (error: Error) => void;
}

export default function ReCAPTCHA({ siteKey, action, onVerify, onError }: ReCAPTCHAProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => setIsReady(true));
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => setIsReady(true));
      }
    };

    script.onerror = () => {
      onError?.(new Error('فشل تحميل reCAPTCHA'));
    };

    document.head.appendChild(script);

    return () => {
      // Don't remove script on unmount as it might be needed elsewhere
    };
  }, [siteKey, onError]);

  const execute = useCallback(async () => {
    if (!isReady || !window.grecaptcha) {
      return null;
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      return token;
    } catch (error) {
      onError?.(error as Error);
      return null;
    }
  }, [isReady, siteKey, action, onError]);

  // Auto-execute when ready
  useEffect(() => {
    if (isReady) {
      execute().then((token) => {
        if (token) {
          onVerify(token);
        }
      });
    }
  }, [isReady, execute, onVerify]);

  return null; // Invisible reCAPTCHA
}

// Hook for using reCAPTCHA
export function useReCAPTCHA(siteKey: string, action: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (window.grecaptcha) {
      setIsLoaded(true);
      window.grecaptcha.ready(() => setIsReady(true));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => setIsReady(true));
      }
    };

    script.onerror = () => {
      setError(new Error('فشل تحميل reCAPTCHA'));
    };

    document.head.appendChild(script);
  }, [siteKey]);

  const execute = useCallback(async (): Promise<string | null> => {
    if (!isReady || !window.grecaptcha) {
      return null;
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      return token;
    } catch (err) {
      setError(err as Error);
      return null;
    }
  }, [isReady, siteKey, action]);

  return { isLoaded, isReady, execute, error };
}

// Higher Order Component for protecting forms
export function withReCAPTCHA<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  siteKey: string,
  action: string,
  onVerify: (token: string, props: P) => void,
) {
  return function WithReCAPTCHA(props: P) {
    const handleVerify = useCallback(
      (token: string) => {
        onVerify(token, props);
      },
      [onVerify, props],
    );

    return (
      <>
        <ReCAPTCHA siteKey={siteKey} action={action} onVerify={handleVerify} />
        <WrappedComponent {...props} />
      </>
    );
  };
}
