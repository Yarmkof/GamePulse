const CACHE_NAME = 'gamepulse-v6-mobile-pwa-v1';
const ASSETS = ['./','index.html','manifest.json','assets/css/styles.css','assets/js/app.js','assets/icons/logo.svg','assets/icons/icon-192.png','assets/icons/icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))); self.clients.claim(); });
self.addEventListener('fetch', event => { event.respondWith(fetch(event.request).then(response => { const copy=response.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(event.request, copy)).catch(()=>{}); return response; }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./')))); });
