const ml = require('./_matelight');
let materix = ml.materix, args = ml.args;

const ScrollText = require('./../scrollText.module');

var scrollText = new ScrollText({ setPixelMethod: materix.setPixel, updateMethod: materix.send, onEnd: scroll });

if(!args.text) {
    console.log('Error: no text paramter given.');
    return;
}

function init() {
for (var x = 0; x < args.width * 5; x++) {
    for (var y = 0; y < args.height * 4; y++) {
        materix.setPixel(x, y, [0, 64, 0])
    }
}
}

function scroll() {
    for (var y = 0; y < args.height * 4; y++)
        for (var x = 0; x < args.width * 5; x++)
            materix.setPixel(x, y, [0, 0, 32]);
    scrollText.setText({
        text: args.text,
        startY: 4,
        endX: args.width * 5 -1,
        //scrollSpeed: 68,
        scrollSpeed: 100,
        textColor: [255, 255, 255],
        backColor: [0, 64, 0]
    });
}

setTimeout(scroll, 200);
setTimeout(init, 150);
