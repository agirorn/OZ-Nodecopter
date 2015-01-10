/* jshint node: true */
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var exec = require('child_process').exec;

var x = 0; // x = 1: forwards, x = 0: stop, x = -1: backwards
var y = 0;

var startVelocity = 5;
var stopVelocity = 50;
var clientSpeed = 0.1;
var canNavigate = true;
var navigationTimeout = 500;

function blink() {
  client.animateLeds('blinkGreen', 5, 1);
}

function blinkRed() {
  client.animateLeds('blinkRed', 5, 1);
}

function say_ping() {
  // exec('say ping');
}

function say_pong() {
  // exec('say pong');
}

var canNavigateFrontBack = true;
var canNavigateLeftRigth = true;

function SM(data) {
    // if(!(data.demo)) { console.log('no demo!'); return; }

    if (!data.demo) {
      return;
    }

    var frontBackDegrees = data.demo.frontBackDegrees;
    var boostTimeOut = 300;
    var speedBoost = 0.5;
    var speed = 0.1;
    var touchDelay = 1000;

    if (frontBackDegrees > 4) {
      if (canNavigateFrontBack) {
        console.log('back : ' + frontBackDegrees);
        canNavigate = false;
        client.back(speedBoost);
        setTimeout(function() {
          blinkRed();
          client.back(speed);
          say_ping();
        }, boostTimeOut);
        setTimeout(function() {
          canNavigateFrontBack = true;
          blink();
        }, touchDelay);
      }
    }
    if ( frontBackDegrees < -4) {
      if (canNavigateFrontBack) {
        console.log('front : ' + frontBackDegrees);
        canNavigate = false;
        client.front(speedBoost);
        setTimeout(function() {
          blinkRed();
          client.front(speed);
          say_pong();
        }, boostTimeOut);
        setTimeout(function() {
          canNavigateFrontBack = true;
          blink();
        }, touchDelay);
      }
    }

    var leftRightDegrees = data.demo.leftRightDegrees;

    if (leftRightDegrees > 4) {
      if (canNavigateLeftRigth) {
        console.log('back : ' + leftRightDegrees);
        canNavigate = false;

        client.right(speedBoost);
        setTimeout(function() {
          blinkRed();
          client.right(speed);
        }, boostTimeOut);

        setTimeout(function() {
          canNavigateLeftRigth = true;
          blink();
        }, touchDelay);
      }
    }
    if ( leftRightDegrees < -4) {
      if (canNavigateLeftRigth) {
        console.log('front : ' + leftRightDegrees);
        canNavigate = false;

        client.left(speedBoost);
        setTimeout(function() {
          blinkRed();
          client.left(speed);
        }, boostTimeOut);

        setTimeout(function() {
          canNavigateLeftRigth = true;
          blink();
        }, touchDelay);
      }
    }
}

// client.takeoff();
// client.config('general:flying_mode', 1);
client.config('control:altitude_max', 1000);

client.takeoff();
client.after(8000, function() {
    client.on('navdata', SM);
    blink();
});

client.after(90000, function() {
    client.stop();
    client.land();
});

// client.after(3000, function() {
//     client.stop();
//     client.land();
// });

client.createRepl();
