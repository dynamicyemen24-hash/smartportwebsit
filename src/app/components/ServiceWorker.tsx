import { useEffect, useState } from 'react';

interface ServiceWorkerProps {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
}

const isServiceWorkerSupported = () =>
  typeof navigator !== 'undefined' && 'serviceWorker' in navigator;

export default function ServiceWorker({ onUpdate, onSuccess }: ServiceWorkerProps) {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(isServiceWorkerSupported());
  }, []);

  useEffect(() => {
    if (!isSupported) return;

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('Service Worker registered:', registration.scope);

        if (registration.waiting) {
          onUpdate?.(registration);
        }

        const handleUpdateFound = () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          const handleStateChange = () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                onUpdate?.(registration);
              } else {
                onSuccess?.(registration);
              }
            }
          };

          newWorker.addEventListener('statechange', handleStateChange);
        };

        registration.addEventListener('updatefound', handleUpdateFound);

        const handleControllerChange = () => {
          console.log('Service Worker controller changed');
        };

        navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    if (document.readyState === 'complete') {
      registerServiceWorker();
    } else {
      window.addEventListener('load', registerServiceWorker);
    }

    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, [isSupported, onUpdate, onSuccess]);

  return null;
}

export function useServiceWorker() {
  const [isSupported] = useState(isServiceWorkerSupported());
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if (!isSupported) return;

    let registration: ServiceWorkerRegistration | null = null;

    const handleUpdateFound = () => {
      const installingWorker = registration?.installing;
      if (!installingWorker) return;

      installingWorker.addEventListener('statechange', () => {
        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
          setUpdateAvailable(true);
        }
      });
    };

    const bindUpdateEvents = async () => {
      try {
        registration = await navigator.serviceWorker.ready;

        if (registration.waiting) {
          setUpdateAvailable(true);
        }

        registration.addEventListener('updatefound', handleUpdateFound);
      } catch (error) {
        console.error('Failed to initialize service worker state:', error);
      }
    };

    bindUpdateEvents();

    return () => {
      if (registration) {
        registration.removeEventListener('updatefound', handleUpdateFound);
      }
    };
  }, [isSupported]);

  const activateUpdate = async () => {
    if (!isSupported) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to activate update:', error);
    }
  };

  return {
    isSupported,
    updateAvailable,
    activateUpdate,
  };
}

export function SWUpdateNotification() {
  const { updateAvailable, activateUpdate } = useServiceWorker();

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-[100] bg-[#1e3a5f] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-4">
      <span className="text-sm">تحديث جديد متاح</span>
      <button
        onClick={activateUpdate}
        className="px-4 py-2 bg-[#d4a574] text-[#1e3a5f] rounded-full text-sm font-medium hover:bg-[#c49564] transition-colors"
      >
        تحديث الآن
      </button>
    </div>
  );
}
