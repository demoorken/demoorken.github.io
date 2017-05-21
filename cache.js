importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/game.js',
       '/custom.css',
       '/numeral.min.js',
       '/images/50',
	   '/images/100',
	   '/images/250',
	   '/images/1000',
	   '/images/10000',
	   '/images/100000',
	   '/images/1000000',
	   '/images/10000000'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {

console.log(event.request.url);

});

