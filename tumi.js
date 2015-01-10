
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
client.config('control:altitude_max', 1000);
client.on('navdata', function(data) {
   if(data.demo) {
      console.log(data.demo.velocity);
      if(data.demo.velocity.x <= 0) {
           client.stop();
      }
   } 
//   console.log("");
//   console.log(data);
});
client.takeoff();
client.front(0.1);
client.after(30000, function() { client.stop()
                         client.land();
                         })                  
client.createRepl();

FGSFD
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
client.config('control:altitude_max', 1500);
//control:flying_mode

var x = 0; // x = 1: forwards, x = 0: stop, x = -1: backwards
var y = 0;

var startVelocity = 350;
var stopVelocity = 50;

var clientSpeed = 0.1;

function SM(data) {
    if(!(data.demo)) { console.log("no demo!"); return; }

    var vx = data.demo.velocity.x;
    var vy = data.demo.velocity.y;

    console.log("vx:", vx, "vy:", vy);

    if(x == 0) {
        if(vx > startVelocity) x = 1;
        if(vx < -startVelocity) x = -1;
    }
    else if(x == 1) {
        if(vx < stopVelocity) x = 0;
    }
    else if(x == -1) {
        if(vx > -stopVelocity) x = 0;
    }

    if(y == 0) {
        if(vy > startVelocity) y = 1;
        if(vy < -startVelocity) y = -1;
    }
    else if(y == 1) {
        if(vy < stopVelocity) y = 0;
    }
    else if(y == -1) {
        if(vy > -stopVelocity) y = 0;
    }

    if(x == 0) client.stop();
    if(x == 1) client.front(clientSpeed);
    if(x == -1) client.back(clientSpeed);

//    if(y == 1) client.right(clientSpeed);
//    if(y == -1) client.left(clientSpeed);

    console.log("x:", x, "y:", y);
}

client.takeoff();
client.after(3000, function() {
    client.on('navdata', SM);
}).after(30000, function() {
    client.stop();
    client.land();
});
client.createRepl();

