const Materix = require('./src/materix.module');
const Hardware = require('./src/materixHardware.module');
const Pixel = require('./src/models/pixel.model');

const size = {
    x: 20,
    y: 8
};

var hardware = new Hardware({serialDevice: 'COM11', baudRate: 500000});
var materix = new Materix({width: 4, height: 2, orientation: "landscape", handler: hardware});

var Jimp = require("jimp");

var imgPath = "./assets/jh.png";


    Jimp.read(imgPath).then(function (image) {
        
        for (var x = 0; x < size.x; x++) {
            for (var y = 0; y < size.y; y++) {
                var color = Jimp.intToRGBA(image.getPixelColor(x, y));
                
                console.log(JSON.stringify(color));
                materix.setPixel(x, y, [color.r, color.g, color.b]);
            }
        }

        materix.send();
        

    }).catch(function (err) {
        console.error(err);
    });