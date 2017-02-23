const Materix = require('./src/materix.module');
const Hardware = require('./src/materixHardware.module');
const Pixel = require('./src/models/pixel.model');

var hardware = new Hardware({serialDevice: '/dev/serial0', baudRate: 1000000});
var materix = new Materix({width: 4, height: 2, orientation: "landscape", handler: hardware});

setTimeout(function() {
    materix.setPixel(new Pixel({position: {x: 0, y: 0}, color: {red: 0, green: 0, blue: 255}}));
    materix.setPixel(new Pixel({position: {x: 1, y: 1}, color: {red: 0, green: 255, blue: 0}}));
    materix.setPixel(new Pixel({position: {x: 1, y: 1}, color: {red: 255, green: 0, blue: 0}}));
    materix.send();
}, 1);