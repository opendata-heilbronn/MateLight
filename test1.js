const Materix = require('./src/materix.module');
const Hardware = require('./src/materixHardware.module');
const Pixel = require('./src/models/pixel.model');

var hardware = new Hardware({serialDevice: 'COM11', baudRate: 500000});
var materix = new Materix({width: 4, height: 2, orientation: "landscape", handler: hardware});

var keepaliveTimeout = setTimeout(function() { //keep the script running
    console.log("exiting");
    hardware.close();
}, 10000);

setTimeout(function() {
    materix.setPixel(new Pixel({position: {x: 0, y: 0}, color: {red: 0, green: 0, blue: 255}}));
    materix.setPixel(new Pixel({position: {x: 1, y: 1}, color: {red: 0, green: 255, blue: 0}}));
    materix.setPixel(new Pixel({position: {x: 2, y: 2}, color: {red: 255, green: 0, blue: 0}}));
    materix.send();
    var i = 0;
    var interval = setInterval(function(){
        materix.setPixel(new Pixel({position: {x: i%20, y: Math.floor(i/20)}, color: {red: (i%3==0)*255, green: (i%3==1)*255, blue: (i%3==2)*255}}));
        materix.send();
        if(i == 159) clearInterval(interval);
        i++;
    }, 15);

}, 1000);


