const CACHE_NAME = 'gamepulse-2-0-3-cache';
const ASSETS = [
  './','index.html','mobile.html','manifest.json',
  'assets/css/main.css','assets/js/app.js','assets/js/api.js','assets/js/data.js','assets/js/render.js','assets/js/assistant.js','assets/data/scorers.json','assets/icons/logo.svg'
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(fetch(req).then(res => {
    if (req.url.startsWith(self.location.origin)) {
      const copy = res.clone(); caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
    }
    return res;
  }).catch(() => caches.match(req).then(cached => cached || caches.match('./index.html'))));
});
