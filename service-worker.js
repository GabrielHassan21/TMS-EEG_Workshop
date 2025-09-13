const CACHE = 'ntms-2025-v2';
const ASSETS = ["./program_all_groups.html", "./Group_A.html", "./Group_B.html", "./Group_C.html", "./Group_D.html", "./Group_E.html", "./Group_F.html", "./Group_G.html", "./Group_H.html", "./group_assignments.html", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});