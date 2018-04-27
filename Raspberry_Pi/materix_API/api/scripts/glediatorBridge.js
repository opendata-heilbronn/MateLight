const ml = require('./_matelight');
let materix = ml.materix, args = ml.args;

const Glediator = require('./../glediator.module');

let glediator = new Glediator({
    width: args.width,
    height: args.height,
    orientation: args.orientation,
    setPixelMethod: materix.setPixel,
    updateMethod: materix.send
});

glediator.start();
