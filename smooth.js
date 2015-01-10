var arDrone = require('ar-drone');
var client  = arDrone.createClient();
client.config('control:altitude_max', 1500);
//control:flying_mode
//client.config('general:flying_mode', 1);

var x = 0; // x = 1: forwards, x = 0: stop, x = -1: backwards
var y = 0;

var startVelocity = 250;
var stopVelocity = 50;

var clientSpeed = 0.1;

function SM(vx, vy) {

//    console.log("vx:", vx, "vy:", vy);

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

    if(y == 1) client.left(clientSpeed);
    if(y == -1) client.right(clientSpeed);

    console.log("x:", x, "y:", y);
}

function Smooth(length) {
    this.length = length;
    this.index = 0;
    this.array = [];
    this.insert = function(i) {
        this.array[this.index] = i;
        this.index++;
        if(this.index > this.length) {
            this.index = 0;
        }
    };
    this.val = function() {
        var sum = 0;
        for(var i = 0; i < this.length; i++) {
            sum += this.array[i] || 0;
        }
        return sum / this.length;
    };
}    

client.takeoff();
client.after(2000, function() {
    var smooth_x = new Smooth(3);
    var smooth_y = new Smooth(3);
    client.on('navdata', function(data) {
        if(!(data.demo)) { console.log("no demo!"); return; }
        
        smooth_x.insert(data.demo.velocity.x);
        smooth_y.insert(data.demo.velocity.y);
        SM(smooth_x.val(), smooth_y.val());
    });
}).after(60000, function() {
    client.stop();
    client.land();
});
client.createRepl();
