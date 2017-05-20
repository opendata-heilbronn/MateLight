const font = require('./font');

var tickTimeout;
var setPixelMethod, updateMethod, callback;

function constructor(opts) {
    if(opts.setPixelMethod == undefined) throw new Error('no setPixel method supplied');
    if(opts.updateMethod == undefined) throw new Error('no update method supplied');

    setPixelMethod = opts.setPixelMethod;
    updateMethod = opts.updateMethod;
    callback = opts.onEnd;
}

function setText(conf) {
    var c = {
        text: conf.text || "",
        scrollSpeed: conf.scrollSpeed || 100,
        font: conf.font || "5x7",
        charSpacing: conf.charSpacing || 1, //spacing between characters
        textColor: conf.textColor || [255, 255, 255],
        backColor: conf.backColor || [0, 0, 0],
        startX: conf.startX || 0,
        startY: conf.startY || 0,
        endX: conf.endX || 4,
        iterationCounter: 0,
    };
    tickTimeout = setTimeout(() => { //start the scrollText | TODO: maybe provide an additional start function
        scrollTick(c);
    }, c.scrollSpeed);
}

function stop() {
    clearTimeout(tickTimeout);
}

function scrollTick(conf) {
    var charWidth = font[conf.font].width + conf.charSpacing;
    var offset = conf.endX - conf.startX + 1; //offset for the spacing before (and after) the actual text
    for (var x = 0; x < offset; x++) {
        if (conf.iterationCounter + x < conf.endX - conf.startX || conf.iterationCounter + x >= offset + (conf.text.length * charWidth)) {
            var curChar = 32; //space
            var curCharColumn = 0; //always print back Color
        } else {
            var curCharIdx = (conf.iterationCounter - offset + x) / charWidth;
            var curCharColumn = (conf.iterationCounter - offset + x) % charWidth; //get column count of the current character (which column of the font to draw)
            curChar = conf.text.charCodeAt(curCharIdx);
        }

        var fontColumn = font[conf.font].data[curChar - 32][curCharColumn]; //get the correct font data column
        for (var y = 0; y < font[conf.font].height; y++) {
            if (curCharColumn < font[conf.font].width) { //if column to draw is not a spacing column (between characters)
                var fontBit = (128 >> y) & fontColumn; //get the right bit from the font column data
                setPixelMethod(x + conf.startX, y + conf.startY, fontBit ? conf.textColor : conf.backColor);
            } else {
                setPixelMethod(x + conf.startX, y + conf.startY, conf.backColor);
            }
        }
    }
    updateMethod(); //write changes to materix
    conf.iterationCounter++;
    if (conf.iterationCounter <= offset + conf.text.length * charWidth) //if the text is not over
    {
        tickTimeout = setTimeout(() => { //schedule the next tick
            scrollTick(conf);
        }, conf.scrollSpeed);
    } else {
        //materix.stop(); //only needed for clean stopping of the simulation (not needed for real MATErix) | TODO: Remove before prod
        if(callback) callback();
    }
}

module.exports = function(opts) {
    constructor(opts);
    return {
        setText,
        stop
    }
}