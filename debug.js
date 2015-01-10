var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.on('navdata', function(data) {
  console.log(data.demo.velocity);
});
