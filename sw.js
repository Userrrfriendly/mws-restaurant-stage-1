const cachePrefix = 'restaurant-review-app-';
let cacheVersion = 'version-1';
const urlsToCache = [
    '/',
    'css/styles.css',
    'data/restaurants.json',
    'restaurant.html',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    '/restaurant.html?id=1',
    '/restaurant.html?id=2',
    '/restaurant.html?id=3',
    '/restaurant.html?id=4',
    '/restaurant.html?id=5',
    '/restaurant.html?id=6',
    '/restaurant.html?id=7',
    '/restaurant.html?id=8',
    '/restaurant.html?id=9',
    '/restaurant.html?id=10',
    '/restaurant.html?id=11',
    '/restaurant.html?id=12',
];

self.addEventListener('install', event => {
    console.log('[service-worker is beeing installed]');
    event.waitUntil(
        caches.open(cachePrefix + cacheVersion).then((cache) => {
            console.log('[service-worker is caching urls]');
            return cache.addAll(urlsToCache);
        }).catch((error) => {
            console.log(error);
        }).then(() => {
            self.skipWaiting();
        })
    );
});


self.addEventListener('activate', e => {
    console.log('[service-worker is beeing activated]');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(thisCacheName => {
                if (thisCacheName.startsWith(cachePrefix)) {
                    console.log('[Service Worker is deleting items from: ' + cachePrefix + ']');
                    if (thisCacheName === cachePrefix + cacheVersion) {
                        return;
                    } else {
                        return caches.delete(thisCacheName)
                    };
                }
            }))
        })
    )
});

self.addEventListener('fetch', e => {
    // console.log('[service-worker has intersepted a fetch event]');
    e.respondWith(
        caches.match(e.request.url).then((response) => {
            if (response) {
                console.log('[service-worker is fetching a response from cache]');
                return response;
            } else {
                console.log('[service-worker FAILED to FETCH from cache( ' + response + ' ) and now goes to the network to fetch: ' + e.request.url);
                return fetch(e.request);
            }
        })
    );
})
