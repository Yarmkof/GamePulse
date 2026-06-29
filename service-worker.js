const CACHE_NAME = 'gamepulse-v8-cache';
const ASSETS = ['./','index.html','assets/css/styles.css','assets/js/app.js','assets/icons/logo.svg','manifest.json'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(fetch(e.request).catch(() => caches.match(e.request))));
