"use strict";

const TAG = 'Service worker';

const cacheName = 'v1';

const cacheAssets = [
    '/index.html',
    '/about.html',
    '/css/style.css',
    '/js/main.js'
];

self.addEventListener('install', (e) => {
    console.log('Service worker installed');

    // Prefetch
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log(TAG + ': Caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

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
            .catch(err => {
                console.log(TAG + ': Loading from cache');
                caches.match(e.request);
            })
    );
});
