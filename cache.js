importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('MWA').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/game.js',
       '/custom.css',
       '/numeral.min.js',
	   '/jquery-1.11.1.min.js',
	   '/jquery.mobile-1.4.5.min.js',
	   '/jqueryconfirm/jqueryconfirm.js',
	   '/jqueryconfirm/jqueryconfirm.css',
	   '/browserconfig.xml',
	   '/manifest.json',
	   '/jqueryconfirm/buttons.png',
	   '/jqueryconfirm/header_bg.jpg',
	   '/jqueryconfirm/body_bg.jpg',
       '/images/50.png',
	   '/images/100.png',
	   '/images/250.png',
	   '/images/1000.png',
	   '/images/10000.png',
	   '/images/100000.png',
	   '/images/1000000.png',
	   '/images/10000000.png',
	   '/images/tent.png',
	   '/images/farm.png',
	   '/images/barracks.png',
	   '/images/church.png',
	   '/images/castle.png',
	   '/images/bank.png',
	   '/images/builder.png',
	   '/favicon/android-icon-36x36.png',
	   '/favicon/android-icon-48x48.png',
	   '/favicon/android-icon-72x72.png',
	   '/favicon/android-icon-96x96.png',
	   '/favicon/android-icon-120x120.png',
	   '/favicon/android-icon-144x144.png',
	   '/favicon/android-icon-192x192.png',
	   '/favicon/apple-icon.png',
	   '/favicon/apple-icon-57x57.png',
	   '/favicon/apple-icon-60x60.png',
	   '/favicon/apple-icon-72x72.png',
	   '/favicon/apple-icon-76x76.png',
	   '/favicon/apple-icon-114x144.png',
	   '/favicon/apple-icon-120x120.png',
	   '/favicon/apple-icon-144x144.png',
	   '/favicon/apple-icon-152x152.png',
	   '/favicon/apple-icon-180x180.png',
	   '/favicon/apple-icon-precomposed.png',
	   '/favicon/favicon.ico',
	   '/favicon/favicon-32x32.png',
	   '/favicon/favicon-96x96.png',
	   '/favicon/ms-icon-70x70.png',
	   '/favicon/ms-icon-144x144.png',
	   '/favicon/ms-icon-150x150.png',
	   '/favicon/ms-icon-310x310.png'
	   
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {

console.log(event.request.url);

event.respondWith(

caches.match(event.request).then(function(response) {

return response || fetch(event.request);

})

);

});

