var CACHE_NAME = 'my-web-app-cache';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/app.js',
  '/scripts/lib.js'
];

self.addEventListener('install', function(event) {
  // event.waitUntil takes a promise to know how
  // long the installation takes, and whether it 
  // succeeded or not.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      // This method looks at the request and
      // finds any cached results from any of the
      // caches that the Service Worker has created.
      caches.match(event.request)
        .then(function(response) {
          // If a cache is hit, we can return thre response.
          if (response) {
            return response;
          }
  
          // Clone the request. A request is a stream and
          // can only be consumed once. Since we are consuming this
          // once by cache and once by the browser for fetch, we need
          // to clone the request.
          var fetchRequest = event.request.clone();
          
          // A cache hasn't been hit so we need to perform a fetch,
          // which makes a network request and returns the data if
          // anything can be retrieved from the network.
          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
  
              // Cloning the response since it's a stream as well.
              // Because we want the browser to consume the response
              // as well as the cache consuming the response, we need
              // to clone it so we have two streams.
              var responseToCache = response.clone();
  
              caches.open(CACHE_NAME)
                .then(function(cache) {
                  // Add the request to the cache for future queries.
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });