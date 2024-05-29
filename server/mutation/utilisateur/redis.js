const redis = require('redis');
const Client = redis.createClient();

Client.connect()

Client.on('connect', function() {
    console.log(' 🎉 Connecté au serveur Redis 🎉 ');
})

Client.on('error', function (err) {
    console.log('Erreur Redis: ' + err);
})

module.exports = {Client}

// le en bas c'est dans le cloud

// const { createClient } = require('redis');

// const Client = createClient({
//   url: "rediss://default:68ef55a6494d4809b0a43058ca74198f@usw2-chief-sheep-30157.upstash.io:30157"
// });

// Client.on('connect', function() {
//   console.log(' 🎉 Connecté au serveur Redis 🎉 ');
// });

// Client.on('error', function (err) {
//   console.log('Erreur Redis: ' + err);
// });

// Client.connect(function (err) {
//   if (err) throw err;
//   Client.set('foo', 'bar', function(err, reply) {
//     if (err) throw err;
//     console.log(reply);
//     Client.quit();
//   });
// });

// module.exports = { Client };
