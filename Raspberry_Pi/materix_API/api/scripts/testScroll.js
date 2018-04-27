const ml = require('./_matelight');
let materix = ml.materix, args = ml.args;

const ScrollText = require('./../scrollText.module');

var scrollText = new ScrollText({ setPixelMethod: materix.setPixel, updateMethod: materix.send, onEnd: scroll });

if(!args.text) {
    console.log('Error: no text paramter given.');
    return;
}

function scroll() {
    for (var y = 0; y < args.height * 4; y++)
        for (var x = 0; x < args.width * 5; x++)
            materix.setPixel(x, y, [0, 0, 32]);
    scrollText.setText({
        text: args.text,
        startY: 0,
        endX: args.width * 5 -1,
        //scrollSpeed: 68,
        scrollSpeed: 68,
        textColor: [255, 0, 0],
        backColor: [0, 0, 32]
    });
}

setTimeout(scroll, 100);
