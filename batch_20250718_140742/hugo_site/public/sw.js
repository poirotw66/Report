// NeoTrendHub Service Worker for Performance Optimization
const CACHE_NAME = 'neotrendhub-v1.0.0';
const STATIC_CACHE = 'neotrendhub-static-v1';
const DYNAMIC_CACHE = 'neotrendhub-dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/css/styles.css',
    '/js/main.js',
    '/favicon.ico',
    '/offline.html'
];

// Install event - cache static files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Handle different types of requests
    if (request.destination === 'document') {
        // HTML pages - Network first, cache fallback
        event.respondWith(
            fetch(request)
                .then(response => {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE)
                        .then(cache => cache.put(request, responseClone));
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then(response => {
                            return response || caches.match('/offline.html');
                        });
                })
        );
    } else {
        // Static assets - Cache first, network fallback
        event.respondWith(
            caches.match(request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    
                    return fetch(request)
                        .then(response => {
                            // Only cache successful responses
                            if (response.status === 200) {
                                const responseClone = response.clone();
                                caches.open(DYNAMIC_CACHE)
                                    .then(cache => cache.put(request, responseClone));
                            }
                            return response;
                        });
                })
        );
    }
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Handle background sync tasks
            console.log('Background sync triggered')
        );
    }
});
