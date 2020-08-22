"use strict";

if ('serviceWorker' in navigator) {
    console.log('Service worker supported');

    window.addEventListener('load', (e) => {
        console.log('Main Js loaded: ' + JSON.stringify(e));
        navigator.serviceWorker
            //.register('sw_cached_pages.js')
            .register('sw_cached_site.js')
            .then(registration => console.log('Service worker registered: ' + JSON.stringify(registration)))
            .catch(err => console.error('Error while registering service worker: ' + err));
    });
}
