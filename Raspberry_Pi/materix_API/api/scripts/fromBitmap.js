const ml = require('./_matelight');
let materix = ml.materix, args = ml.args;

var Jimp = require("jimp");

var on = false;

setTimeout(function () {
    setInterval(function () {
        Jimp.read(args.url).then(function (image) {

            image = image.resize(materix.getPixelWidth(), materix.getPixelHeight());

            for (var x = 0; x < materix.getPixelWidth(); x++) {
                for (var y = 0; y < materix.getPixelHeight(); y++) {
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