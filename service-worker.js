// Simple offline cache + notification relay
const CACHE = 'cyber-habit-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil((async () => { const keys = await caches.keys(); await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))); await self.clients.claim(); })()); });
self.addEventListener('fetch', (e) => { const { request } = e; if (request.method !== 'GET') return; e.respondWith((async () => { const cached = await caches.match(request); if (cached) return cached; try { const fresh = await fetch(request); const cache = await caches.open(CACHE); cache.put(request, fresh.clone()); return fresh; } catch { return cached || new Response('Offline', { status: 503, statusText: 'Offline' }); } })()); });
self.addEventListener('message', (e) => { const data = e.data || {}; if (data.type === 'notify') { self.registration.showNotification(data.title || 'Notification', data.options || {}); } });
