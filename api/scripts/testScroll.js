const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'text', alias: 't', type: String },
    { name: 'orientation', alias: 'o', type: String, defaultOption: 'landscape' },
    { name: 'width', alias: 'w', type: Number },
    { name: 'height', alias: 'h', type: Number },
    { name: 'device', alias: 'd', type: String, defaultOption: '/dev/ttyUSB0' },
];

const options = commandLineArgs(optionDefinitions);

console.log(options);


// ---------------------------------------------------------------------------

const Materix =     require('./../materix.module');
const Hardware =    require('./../materixHardware.module');
const ScrollText =  require('./../scrollText.module');
const Pixel =       require('./../models/pixel.model');

var hardware = new Hardware({serialDevice: options.device, baudRate: 500000});
var width = options.width, height = options.height;
var materix = new Materix({width: width, height: height, orientation: options.orientation, handler: hardware});
var scrollText = new ScrollText({setPixelMethod: materix.setPixel, updateMethod: materix.send, onEnd: scroll});

var params = process.argv;
params.shift(); //remove first two elements
params.shift();

function scroll() {
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
}

setTimeout(scroll, 100);
