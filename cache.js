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
	   '/jquery-1.11.1.min.js',
	   '/jquery.mobile-1.4.5.min.js',
	   '/jqueryconfirm/jqueryconfirm.js',
	   '/jqueryconfirm/jqueryconfirm.css',
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
	   '/images/builder.png'
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

