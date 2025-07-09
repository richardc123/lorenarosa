const CACHE_NAME = 'aniversario-luciana-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/img/foto_1.jpg',
  '/img/foto_2.jpg',
  '/img/foto_3.jpg',
  '/img/foto_4.jpg',
  '/img/foto_5.jpg',
  '/img/foto_6.jpg'
];

// Evento de Instalação: Salva os arquivos em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: Responde com os arquivos do cache se estiverem disponíveis
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se o arquivo estiver no cache, retorna ele. Senão, busca na rede.
        return response || fetch(event.request);
      })
  );
});
