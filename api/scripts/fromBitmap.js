const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'url', alias: 'u', type: String },
    { name: 'orientation', alias: 'o', type: String, defaultOption: 'landscape' },
    { name: 'width', alias: 'w', type: Number },
    { name: 'height', alias: 'h', type: Number },
    { name: 'device', alias: 'd', type: String, defaultOption: '/dev/ttyUSB0' },
];

const options = commandLineArgs(optionDefinitions);

// ---------------------------------------------------------------------------

const Materix = require('./../materix.module');
const Hardware = require('./../materixHardware.module');
const Pixel = require('./../models/pixel.model');

const size = {
    x: options.orientation == 'landscape' ? 4 * options.height : 5 * options.height,
    y: options.orientation == 'landscape' ? 5 * options.width : 4 * options.width
};

var hardware = new Hardware({ serialDevice: options.device, baudRate: 500000 });
var materix = new Materix({ width: options.width, height: options.height, orientation: options.orientation, handler: hardware });

var Jimp = require("jimp");

var on = false;
var offset = 0; //tmp

setTimeout(function () {
    setInterval(function () {
        Jimp.read(options.url).then(function (image) {

            image.resize(size.x, size.y);

            for (var x = 0; x < size.x; x++) {
                for (var y = 0; y < size.y - offset; y++) {
                    var color = Jimp.intToRGBA(image.getPixelColor(x, y + offset));
                    materix.setPixel(x, y, [color.r, color.g, color.b]);
                }
            }

            materix.send();

        }).catch(function (err) {
            console.error(err);
        });
        offset = offset ? 0 : 1; //toggles between 0 and 1
    }, 500);
}, 3000);