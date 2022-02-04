const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'orientation', alias: 'o', type: String, defaultValue: 'landscape' },
    { name: 'rotation', alias: 'r', type: String, defaultValue: 'normal' },
    { name: 'width', alias: 'w', type: Number },
    { name: 'height', alias: 'h', type: Number },
    { name: 'device', alias: 'd', type: String, defaultValue: '/dev/ttyUSB0' },
    { name: 'text', alias: 't', type: String },
    { name: 'url', alias: 'u', type: String },
];

const options = commandLineArgs(optionDefinitions);

console.log(options);

// ---------------------------------------------------------------------------

let Materix = null, hardware = null;

if (options.device == 'sim') {
    Materix = require('./../materixSimulator.module');
}
else {
    Materix = require('./../materix.module');
    const Hardware = require('./../materixHardware.module');
    hardware = new Hardware({ serialDevice: options.device, baudRate: 500000 });
}

let width = options.width, height = options.height;
let materix = new Materix({ width: width, height: height, orientation: options.orientation, rotation: options.rotation, handler: hardware });

module.exports = {
    materix: materix,
    args: options
}