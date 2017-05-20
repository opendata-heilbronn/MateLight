const Materix = require('./src/materix.module');
const Hardware = require('./src/materixHardware.module');
const Pixel = require('./src/models/pixel.model');

const size = {
    x: 15,
    y: 16
};

var hardware = new Hardware({ serialDevice: '/dev/ttyUSB0', baudRate: 500000 });
var materix = new Materix({ width: 3, height: 4, orientation: "landscape", handler: hardware });

var Jimp = require("jimp");

var imgPath = "./assets/smile.png";


var on = false;
var offset = 0; //tmp

setTimeout(function () {
setInterval(function(){
    Jimp.read(imgPath).then(function (image) {
	
        for (var x = 0; x < size.x; x++) {
            for (var y = 0; y < size.y-offset; y++) {
                var color = Jimp.intToRGBA(image.getPixelColor(x, y+offset));
                materix.setPixel(x, y, [color.r, color.g, color.b]);
            }
        }

//        setTimeout(function () {
//
//            console.log("sending");
            materix.send();
            //materix.send();
//        }, 0);


    }).catch(function (err) {
        console.error(err);
    });
    offset = offset ? 0 : 1; //toggles between 0 and 1
}, 500);
}, 3000);

