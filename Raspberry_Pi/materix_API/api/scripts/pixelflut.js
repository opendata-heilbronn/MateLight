const ml = require('./_matelight');
let materix = ml.materix, args = ml.args;

const PixelFlut = require('./../pixelflut.module');


let pixelflut = new PixelFlut({
    width: args.width,
    height: args.height,
    orientation: args.orientation,
    setPixelMethod: materix.setPixel,
    updateMethod: materix.send
});

pixelflut.start();
