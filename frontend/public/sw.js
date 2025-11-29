const CACHE_NAME = 'vm-solutions-v1.0.0';
const STATIC_CACHE_NAME = 'vm-solutions-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'vm-solutions-dynamic-v1.0.0';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon.svg',
  // Add your main CSS and JS files here when they're built
  // These will be available after build
];

// API endpoints and dynamic content
const DYNAMIC_CACHE_URLS = [
  '/api/products',
  '/api/products/featured/list',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => url !== '/'));
      }),
      // Cache the root page separately to handle it better
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.add('/').catch(err => {
          console.log('Could not cache root page:', err);
        });
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      // Force the waiting service worker to become the active service worker
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker: Activation complete');
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    handleFetch(request, url)
  );
});

async function handleFetch(request, url) {
  try {
    // For navigation requests (page loads)
    if (request.mode === 'navigate') {
      return await handleNavigationRequest(request);
    }

    // For API requests
    if (url.pathname.startsWith('/api/')) {
      return await handleApiRequest(request);
    }

    // For static assets
    return await handleStaticRequest(request);
    
  } catch (error) {
    console.log('Service Worker: Fetch error:', error);
    return await handleFallback(request);
  }
}

async function handleNavigationRequest(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // If network fails, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cache, return the main app shell
    const appShell = await caches.match('/');
    if (appShell) {
      return appShell;
    }
    
    // Last resort - return a basic offline page
    return new Response(
      createOfflinePage(),
      {
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

async function handleApiRequest(request) {
  try {
    // Try network first for API requests
    const networkResponse = await fetch(request);
    
    // Cache successful GET requests
    if (networkResponse.ok && request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // If network fails, try cache for GET requests
    if (request.method === 'GET') {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // Return offline response for API requests
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: 'This feature requires an internet connection',
        offline: true 
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

async function handleStaticRequest(request) {
  // Try cache first for static assets
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // If not in cache, try network
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return a fallback for failed static requests
    return new Response('Offline', { status: 503 });
  }
}

async function handleFallback(request) {
  // Try to get any cached version
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Return appropriate fallback based on request type
  if (request.mode === 'navigate') {
    const appShell = await caches.match('/');
    if (appShell) {
      return appShell;
    }
    
    return new Response(
      createOfflinePage(),
      {
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
  
  return new Response('Offline', { status: 503 });
}

function createOfflinePage() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>VM Solutions - Offline</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6, #14b8a6);
          color: white;
          text-align: center;
        }
        .container {
          max-width: 400px;
          padding: 2rem;
        }
        .logo {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          font-size: 2rem;
          font-weight: bold;
          color: #3b82f6;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.1rem;
          opacity: 0.9;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .retry-btn {
          background: white;
          color: #3b82f6;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .retry-btn:hover {
          transform: translateY(-2px);
        }
        .features {
          margin-top: 2rem;
          text-align: left;
        }
        .feature {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .feature::before {
          content: "✓";
          margin-right: 0.5rem;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">VM</div>
        <h1>You're Offline</h1>
        <p>Don't worry! VM Solutions works offline too. You can still browse our cached content and features.</p>
        
        <div class="features">
          <div class="feature">Browse previously viewed products</div>
          <div class="feature">Access cached service information</div>
          <div class="feature">View your profile and settings</div>
          <div class="feature">Continue where you left off</div>
        </div>
        
        <button class="retry-btn" onclick="window.location.reload()">
          Try Again
        </button>
      </div>
      
      <script>
        // Auto-retry when connection is restored
        window.addEventListener('online', () => {
          window.location.reload();
        });
        
        // Show connection status
        if (navigator.onLine) {
          document.querySelector('.retry-btn').textContent = 'Refresh Page';
        }
      </script>
    </body>
    </html>
  `;
}

// Handle background sync (when connection is restored)
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform any background sync tasks here
      console.log('Service Worker: Performing background sync')
    );
  }
});

// Handle push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-72x72.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('VM Solutions', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for communication with the main app
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});