const CACHE_NAME = 'sinemfit-v1';
const urlsToCache = [
  '/',
  '/logo.png',
  '/manifest.json'
];

// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Background sync for notifications
self.addEventListener('sync', function(event) {
  if (event.tag === 'workout-reminder') {
    event.waitUntil(sendWorkoutReminder());
  }
});

function sendWorkoutReminder() {
  return self.registration.showNotification('Spor Zamanı!', {
    body: 'Spor yapma zamanınız geldi!',
    icon: '/logo.png',
    badge: '/logo.png',
    tag: 'workout-reminder',
    requireInteraction: true
  });
}
