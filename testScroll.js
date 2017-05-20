const Materix = require('./src/materix.module');
const Hardware = require('./src/materixHardware.module');
const ScrollText = require('./src/scrollText.module');
const Pixel = require('./src/models/pixel.model');

var hardware = new Hardware({serialDevice: '/dev/ttyUSB0', baudRate: 500000});
var width = 3, height = 4;
var materix = new Materix({width: width, height: height, orientation: "landscape", handler: hardware});
var scrollText = new ScrollText({setPixelMethod: materix.setPixel, updateMethod: materix.send, onEnd: ()=>{console.log("done")}});

var params = process.argv;
params.shift(); //remove first two elements
params.shift();

setTimeout(function(){
    for(var y = 0; y < height*4; y++)
        for(var x = 0; x < width*5; x++)
            materix.setPixel(x, y, [0, 0, 32]);
    scrollText.setText({
        text: params.join(' '),
        startY: 0,
        endX: 14,
        //scrollSpeed: 68,
        scrollSpeed: 68,
        textColor: [255, 0, 0],
        backColor: [0, 0, 32]
    });
}, 100);
