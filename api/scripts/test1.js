const Materix = require('./../materix.module');
const Hardware = require('./../materixHardware.module');
const Pixel = require('./../models/pixel.model');

var hardware = new Hardware({serialDevice: 'COM11', baudRate: 500000});
var materix = new Materix({width: 4, height: 3, orientation: "landscape", handler: hardware});

setTimeout(function() {
    materix.setPixel(0, 0, [255, 0, 0]);
    materix.setPixel(1, 1, [0, 255, 0]);
    materix.setPixel(2, 2, [0, 0, 255]);
    materix.send();
    var i = 0;
    var interval = setInterval(function(){
        materix.setPixel(i%20, Math.floor(i/20), [(i%3==0)*255, (i%3==1)*255, (i%3==2)*255]);
        materix.send();
        if(i == 159) clearInterval(interval);
        i++;
    }, 50);
}, 100);


