const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'url', alias: 'u', type: String },
    { name: 'orientation', alias: 'o', type: String, defaultOption: 'landscape' },
    { name: 'width', alias: 'w', type: Number },
    { name: 'height', alias: 'h', type: Number },
    { name: 'device', alias: 'd', type: String, defaultOption: '/dev/ttyUSB0' },
];

const options = commandLineArgs(optionDefinitions);

console.log(options);


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

setTimeout(function () {
    setInterval(function () {
        Jimp.read(options.url).then(function (image) {

            image = image.resize(size.x, size.y);

            for (var x = 0; x < materix.getHeight(); x++) {
                for (var y = 0; y < materix.getWidth(); y++) {
                    try {
                        var color = Jimp.intToRGBA(image.getPixelColor(x, y));
                        materix.setPixel(x, y, [color.r, color.g, color.b]);
                    } catch(err) {
                        console.error(err);
                    }
                }
            }

            materix.send();

        }).catch(function (err) {
            console.error(err);
        });
    }, 500);
}, 3000);