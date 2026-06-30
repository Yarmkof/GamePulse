const CACHE_NAME = 'gamepulse-v2-0-1-cache';
const ASSETS = ['./','index.html','assets/css/styles.css','assets/js/app.js','assets/icons/logo.svg','manifest.json'];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if(url.hostname.includes('site.api.espn.com') || url.hostname.includes('worldcup26.ir')){
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(fetch(e.request).then(res => {
    const copy = res.clone();
    caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
    return res;
  }).catch(() => caches.match(e.request)));
});
