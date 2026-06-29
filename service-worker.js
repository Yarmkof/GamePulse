const CACHE_NAME="gamepulse-v6-1-cache";
const ASSETS=["./","./index.html","./assets/css/styles.css","./assets/js/app.js","./manifest.json"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  const url=new URL(e.request.url);
  if(url.pathname.includes("/assets/data/")){e.respondWith(fetch(e.request,{cache:"no-store"}).catch(()=>caches.match(e.request)));return;}
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request)));
});
