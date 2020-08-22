"use strict";

const TAG = 'Service worker';

const cacheName = 'v2';

self.addEventListener('activate', (e) => {
    console.log('Service worker activated');

    // Clean unwanted/old caches
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== cacheName) {
                            return caches.delete(cache);
                        }
                    }).filter(promise => {
                        if (promise) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                );
            })
    );
});

self.addEventListener('fetch', (e) => {
    console.log(TAG + ': Fetching ' + JSON.stringify(e.request) + ' ...');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                const resCopy = res.clone();
                caches.open(cacheName)
                    .then(cache => {
                        cache.put(e.request, resCopy);
                    });
                return res;
            })
            .catch(err => {
                console.log(TAG + ': Loading from cache');
                caches.match(e.request)
                    .then(res => res);
            })
    );
});
