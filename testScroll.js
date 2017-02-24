const Materix = require('./src/materix.module');
const Hardware = require('./src/materixHardware.module');
const ScrollText = require('./src/scrollText.module');
const Pixel = require('./src/models/pixel.model');

var hardware = new Hardware({serialDevice: 'COM11', baudRate: 500000});
var materix = new Materix({width: 4, height: 2, orientation: "landscape", handler: hardware});
var scrollText = new ScrollText({setPixelMethod: materix.setPixel, updateMethod: materix.send});

setTimeout(function(){
    scrollText.setText({
        text: "Coworking Space Heilbronn",
        endX: 19,
        scrollSpeed: 68,
        textColor: [128, 128, 128],
        //backColor: [0, 16, 0]
    });
}, 100);
