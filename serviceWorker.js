const CACHE_NAME = 'contucuota-v2';
const API_CACHE = 'contucuota-api-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './como-funciona.html',
  './plataforma.html',
  './certificados.html',
  './simulador.html',
  './styles.css',
  './estilos-adicionales.css',
  './estilos-simulador.css',
  './menu-mejorado.css',
  './optimizaciones.css',
  './rendimiento.css',
  './visual.css',
  './correcciones-visuales.css',
  './plataforma.css',
  './certificados.css',
  './calculadora.js',
  './menu.js',
  './simulador.js',
  './plataforma.js',
  './certificados.js',
  './logo_contucuota.png',
  './favicon.png',
  './hero-background.jpg',
  './pattern.png',
  './sector-agroindustria.jpg',
  './sector-cultura.jpg',
  './sector-energia.jpg',
  './sector-medioambiente.jpg',
  './sector-tecnologia.jpg',
  './sector-tradicional.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/profiles')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const cloned = response.clone();
          caches.open(API_CACHE).then(cache => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
