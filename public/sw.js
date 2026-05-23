/**
 * Service Worker for Smart Ports Co. Ltd
 * Provides offline functionality, caching, and performance optimization
 */

const CACHE_NAME = 'smartports-v1';
const STATIC_CACHE = 'smartports-static-v1';
const DYNAMIC_CACHE = 'smartports-dynamic-v1';
const IMAGE_CACHE = 'smartports-images-v1';

// Static assets to cache on install
const STATIC_ASSETS = ['/', '/index.html', '/manifest.webmanifest', '/favicon.svg'];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE && key !== IMAGE_CACHE)
            .map((key) => {
              console.log('Deleting old cache:', key);
              return caches.delete(key);
            }),
        );
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim();
      }),
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle image requests
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Handle static assets
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticRequest(request));
    return;
  }

  // Handle API requests (network first)
  if (isApiRequest(request)) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Default: cache first, network fallback
  event.respondWith(handleDefaultRequest(request));
});

// Check if request is for an image
function isImageRequest(request) {
  return (
    request.destination === 'image' || request.url.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/i)
  );
}

// Check if request is for a static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return (
    url.pathname.match(/\.(js|css|woff|woff2|ttf|eot)$/i) ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font'
  );
}

// Check if request is for an API
function isApiRequest(request) {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith('/api') ||
    url.pathname.includes('supabase') ||
    url.hostname.includes('supabase')
  );
}

// Handle image requests (cache first, long TTL)
async function handleImageRequest(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    // Return cached version but fetch fresh version in background
    fetch(request)
      .then((response) => {
        if (response.ok) {
          caches.open(IMAGE_CACHE).then((cache) => cache.put(request, response));
        }
      })
      .catch(() => {
        // Network failed, cached version is fine
      });

    return cachedResponse;
  }

  // Not in cache, fetch from network
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline image placeholder
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#f3f4f6" width="100" height="100"/><text x="50" y="50" text-anchor="middle" fill="#9ca3af">Image</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } },
    );
  }
}

// Handle static asset requests (cache first)
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return new Response('Resource not available offline', { status: 503 });
  }
}

// Handle API requests (network first, cache fallback)
async function handleApiRequest(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return cached API response if available
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline response
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'You are currently offline. Please check your connection.',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

// Handle default requests (cache first, network fallback)
async function handleDefaultRequest(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    // Return cached version but fetch fresh version in background
    fetch(request)
      .then((response) => {
        if (response.ok) {
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, response));
        }
      })
      .catch(() => {
        // Network failed, cached version is fine
      });

    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const cachedPage = await caches.match('/index.html');
      if (cachedPage) {
        return cachedPage;
      }
    }

    return new Response('Page not available offline', { status: 503 });
  }
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'form-submissions') {
    event.waitUntil(processFormSubmissions());
  }
});

async function processFormSubmissions() {
  // Process any queued form submissions
  const db = await openDB();
  const submissions = await db.getAll('form-submissions');

  for (const submission of submissions) {
    try {
      await fetch('/api/contact-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission.data),
      });
      await db.delete('form-submissions', submission.id);
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title || 'المنافذ الذكية', {
      body: data.body || 'لديك رسالة جديدة',
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      data: data.url ? { url: data.url } : undefined,
      actions: data.actions || [],
    }),
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});

// Helper function to open IndexedDB (for offline form storage)
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SmartPortsDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('form-submissions')) {
        db.createObjectStore('form-submissions', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}
