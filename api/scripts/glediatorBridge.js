const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    {name: 'orientation', alias: 'o', type: String, defaultValue: 'landscape'},
    {name: 'width', alias: 'w', type: Number},
    {name: 'height', alias: 'h', type: Number},
    {name: 'device', alias: 'd', type: String, defaultValue: '/dev/ttyUSB0'},
];

const options = commandLineArgs(optionDefinitions);

console.log(options);

// ---------------------------------------------------------------------------

const Materix = require('./../materix.module');
const Hardware = require('./../materixHardware.module');
const Pixel = require('./../models/pixel.model');
const Glediator = require('./../glediator.module');

let hardware = new Hardware({serialDevice: options.device, baudRate: 500000});
let width = options.width, height = options.height;
let materix = new Materix({width: width, height: height, orientation: options.orientation, handler: hardware});
let glediator = new Glediator({
    width: width,
    height: height,
    orientation: options.orientation,
    setPixelMethod: materix.setPixel,
    updateMethod: materix.send
});

glediator.start();
