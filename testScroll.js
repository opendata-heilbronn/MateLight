const Materix = require('./src/materix.module');
const Hardware = require('./src/materixHardware.module');
const ScrollText = require('./src/scrollText.module');
const Pixel = require('./src/models/pixel.model');

var hardware = new Hardware({serialDevice: '/dev/ttyUSB0', baudRate: 500000});
var materix = new Materix({width: 4, height: 2, orientation: "landscape", handler: hardware});
var scrollText = new ScrollText({setPixelMethod: materix.setPixel, updateMethod: materix.send});

var params = process.argv;
params.shift();
params.shift();

setTimeout(function(){
    scrollText.setText({
        text: params.join(' '),
        endX: 19,
        //scrollSpeed: 68,
        scrollSpeed: 68,
        textColor: [255, 0, 0],
        backColor: [0, 0, 32]
    });
    for(var i = 0; i < 20; i++)
        materix.setPixel(i, 7, [0, 0, 32]);
}, 100);
