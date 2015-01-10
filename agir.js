/* jshint node: true */
var x = 0; // x = 1: forwards, x = 0: stop, x = -1: backwards
var y = 0;

var startVelocity = 350;
var stopVelocity = 50;
var clientSpeed = 0.1;
var canNavigate = true;
var navigationTimeout = 100;

function tryToNavigate(callback) {
  if (!canNavigate) {
    return;
  }
  canNavigate = false;
  callback();
  setTimeout(function() {
    canNavigate = true;
  }, navigationTimeout);
}

var drone = {
  stop: function stop() {
    tryToNavigate(function() {
      console.log('stoping');
      client.stop();
    });
  },
  front: function front() {
    tryToNavigate(function() {
      console.log('front');
      client.front(clientSpeed);
    });
  },
  back: function back() {
    tryToNavigate(function() {
      console.log('back');
      client.back(clientSpeed);
    });
  },
  left: function left() {
    console.log('left 1');
    tryToNavigate(function() {
      console.log('left 2');
      // client.left(clientSpeed);
    });
  },
  right: function right() {
    console.log('right 1');
    tryToNavigate(function() {
      console.log('right 2');
      // client.right(clientSpeed);
    });
  }
};

function SM(data) {
    if(!(data.demo)) { console.log('no demo!'); return; }

    var vx = data.demo.velocity.x;
    var vy = data.demo.velocity.y;

    // console.log('vx:', vx, 'vy:', vy);

    if(x === 0) {
        if(vx > startVelocity) { x = 1; }
        if(vx < -startVelocity) { x = -1; }
    } else if(x === 1) {
        if(vx < stopVelocity) { x = 0; }
    } else if(x === -1) {
        if(vx > -stopVelocity) { x = 0; }
    }

    if(y === 0) {
        if(vy > startVelocity) { y = 1; }
        if(vy < -startVelocity) { y = -1; }
    } else if(y === 1) {
        if(vy < stopVelocity) { y = 0; }
    } else if(y === -1) {
        if(vy > -stopVelocity) { y = 0; }
    }

    // if(x === 0 && x === 0) { drone.stop(); }

    // if(x === 1) { drone.front(); }
    // if(x === -1) { drone.back(); }

    if(y === 1) {
      // console.log('left');
      drone.left();
    }
    if(y === -1) {
      // console.log('right');
      drone.right();
    }

    // console.log('x:', x, 'y:', y);
}

// client.takeoff();
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
// client.config('general:flying_mode', 1);
client.config('control:altitude_max', 1000);

client.takeoff();
client.after(3000, function() {
    client.on('navdata', SM);
});

client.after(30000, function() {
    client.stop();
    client.land();
});

// client.after(3000, function() {
//     client.stop();
//     client.land();
// });

client.createRepl();
