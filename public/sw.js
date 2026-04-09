const CACHE_NAME = 'se-cache-v1';
const STATIC_CACHE = 'se-static-v1';
const DYNAMIC_CACHE = 'se-dynamic-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './offline.html',
  './css/styles.css',
  './logo.png',
  './assets/icons/icon.svg',
  './assets/svg/abertura.svg',
  './assets/svg/declaracao.svg',
  './assets/svg/parcelamento.svg',
  './assets/svg/alteracao.svg',
  './assets/svg/baixa.svg',
  './assets/svg/consulta.svg',
];

const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
};

function getCacheStrategy(url) {
  if (url.includes('/fonts.googleapis.com') || url.includes('/fonts.gstatic.com')) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }
  if (url.includes('.js') || url.includes('.css') || url.includes('.png') || url.includes('.svg') || url.includes('.ico')) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }
  if (url.includes('.html') || url === '/') {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('se-') && name !== CACHE_NAME && name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.origin !== location.origin) {
    return;
  }

  const strategy = getCacheStrategy(event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            return response || caches.match('/offline.html');
          });
        })
    );
    return;
  }

  if (strategy === CACHE_STRATEGIES.CACHE_FIRST) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          return caches.open(STATIC_CACHE).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  } else if (strategy === CACHE_STRATEGIES.NETWORK_FIRST) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        const fetchPromise = fetch(event.request).then((fetchResponse) => {
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
          });
          return fetchResponse;
        });
        return response || fetchPromise;
      })
    );
  }
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Suporte Empreendedor';
  const options = {
    body: data.body || 'Nova mensagem',
    icon: '/assets/icons/icon.svg',
    badge: '/assets/icons/icon.svg',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data ? event.notification.data.url : '/')
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});