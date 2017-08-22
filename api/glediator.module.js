const artnet = require('./modules/artnet.module');

var width, height, pixelWidth, pixelHeight, boxPixelWidth, boxPixelHeight, setPixelMethod, updateMethod, callback, port;
function constructor(opts) {
    if (opts.setPixelMethod == undefined) throw new Error('no setPixel method supplied');
    if (opts.updateMethod == undefined) throw new Error('no update method supplied');

    width = opts.width;
    height = opts.height;
    setPixelMethod = opts.setPixelMethod;
    updateMethod = opts.updateMethod;
    callback = opts.onEnd;
    port = opts.port || 0x1936;

    boxPixelWidth = (opts.orientation == "landscape") ? 5 : 4;
    boxPixelHeight = (opts.orientation == "landscape") ? 4 : 5;
    pixelWidth = opts.width * boxPixelWidth; //generate pixelWidth (x) & pixelHeight (y)
    pixelHeight = opts.height * boxPixelHeight;
}

let frameBuffer = [];
let frameOutputBufer = [];

function dataCbk(frame, peer) {
    let data = frame.data;
    for (let i = 0; i < boxPixelHeight * pixelWidth; i++) {
        let color = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
        let x = i % pixelWidth;
        let y = Math.floor(i / pixelWidth + (frame.universe - 1) * boxPixelHeight); //universe number is equivalent to box row number (glediator config)
        frameBuffer[y][x] = color;
    }
}

function sendCbk() {
    setTimeout(send, 1);
}

function send() {
    console.log(new Date());
    for (let y = 0; y < frameBuffer.length; y++) {
        for (let x = 0; x < frameBuffer[0].length; x++) {
            setPixelMethod(x, y, frameBuffer[y][x]);
        }
    }
    updateMethod(sendCbk);
}

function start() {
    artnet.listen(port, dataCbk);
    for (let y = 0; y < pixelHeight; y++) {
        frameBuffer[y] = [];
        for (let x = 0; x < pixelWidth; x++) {
            frameBuffer[y][x] = [0, 0, 0];
        }
    }
    setTimeout(send, 100);
}

function close() {
    artnet.close()
}

module.exports = function (opts) {
    constructor(opts);
    return {
        start,
        close
    }
}