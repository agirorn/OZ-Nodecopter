/* jshint node:true */
var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.config('control:altitude_max', 1000);
client.takeoff();

client
  .after(1000, function() {
    this.clockwise(0.5);
  })
  .after(3000, function() {
    this.stop();
    this.land();
  });
