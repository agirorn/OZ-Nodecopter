var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.on('navdata', function(data) {
  console.log(data.demo);
});
// client.takeoff();
// client.on('navdata', function(data) {
//   // console.log(data.demo);
//   if (data.demo) {g
//     var frontBackDegrees = data.demo.frontBackDegrees;
//     var leftRightDegrees = data.demo.leftRightDegrees;
//     console.log('frontBackDegrees : ' + frontBackDegrees + ' leftRightDegrees: ' + leftRightDegrees);
//   }

// });



client.createRepl();
