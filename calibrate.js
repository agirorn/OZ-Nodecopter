/* jshing node: true */

var arDrone = require('ar-drone');
var client  = arDrone.createClient();
client.takeoff()
client.after(3000, function() {
  client.calibrate(0);

}).after(8000, function() {
  client.land();
});

client.after(1000, function() {
  process.exit();
});



