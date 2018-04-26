const net = require('net');

let width, height, pixelWidth, pixelHeight, boxPixelWidth, boxPixelHeight, setPixelMethod, updateMethod, callback, port, lastSend, server;
let frameBuffer = [];
function constructor(opts) {
    if (opts.setPixelMethod == undefined) throw new Error('no setPixel method supplied');
    if (opts.updateMethod == undefined) throw new Error('no update method supplied');

    width = opts.width;
    height = opts.height;
    setPixelMethod = opts.setPixelMethod;
    updateMethod = opts.updateMethod;
    callback = opts.onEnd;
    port = opts.port || 0x1936;

    boxPixelWidth = (opts.orientation == 'landscape') ? 5 : 4;
    boxPixelHeight = (opts.orientation == 'landscape') ? 4 : 5;
    pixelWidth = opts.width * boxPixelWidth; //generate pixelWidth (x) & pixelHeight (y)
    pixelHeight = opts.height * boxPixelHeight;
}

function getIPAddr() {
    return new Promise(resolve => {
        require('dns').lookup(require('os').hostname(), async function (err, addr, fam) {
            resolve(addr);
        });
    })

}

function colorToHex(color) {
    return color[0].toString(16) + color[1].toString(16) + color[2].toString(16);
}

function hexToColor(hexStr) {
    r = parseInt(hexStr.substring(0, 2), 16) || 0;
    g = parseInt(hexStr.substring(2, 4), 16) || 0;
    b = parseInt(hexStr.substring(4, 6), 16) || 0;
    if (hexStr.length === 8) {
        a = parseInt(hexStr.substring(6, 8), 16) || 0;
        return [r, g, b, a];
    }
    else
        return [r, g, b];
}

function setColor(x, y, colorStr) {
    if (x < 0 || x >= pixelWidth || y < 0 || y >= pixelHeight)
        return;

    let color = hexToColor(colorStr);
    if (colorStr.length == 8) {
        alpha = color[3];
        color.pop(); //remove alpha from array
    }
    else if (colorStr.length == 6)
        alpha = 255;
    else
        return;

    if (alpha < 1) { //don't need to set color if fully transparent
        return;
    }
    if (alpha < 255) {
        let target = frameBuffer[y][x];
        for (let i = 0; i < 3; i++) {
            let t = target[i] * (255 - alpha)
            color[i] = Math.floor((color[i] * alpha + t) / 255);
        }
    }
    frameBuffer[y][x] = color;
}


function handlePFPacket(socket, packet) {
    parts = packet.split(' ');

    if (parts.length > 0) {
        cmd = parts[0].toUpperCase();
    }
    if (parts.length >= 3) {
        x = parseInt(parts[1]);
        y = parseInt(parts[2]);
    }

    if (parts.length === 1) {
        if (cmd === 'SIZE') {
            socket.write('SIZE ' + pixelWidth + ' ' + pixelHeight + '\n');
        }
    }
    else if (parts.length === 3) {
        if (cmd === 'PX') {
            if (x < 0 || x >= pixelWidth || y < 0 || y >= pixelHeight)
                return;
            try {
                color = frameBuffer[y][x];
                socket.write('PX ' + x + ' ' + y + ' ' + colorToHex(color) + '\n');
            }
            catch (e) {
                console.log(e.message)
            }
            
        }
    }
    else if (parts.length === 4) {
        if (cmd === 'PX') {
            colorStr = parts[3];
            setColor(x, y, colorStr);
        }
    }
}

function sendCbk() {
    setTimeout(send, 40); //workaround, should be only 1ms, but needs to be the frame time
}

function send() {
    console.log('[' + new Date().toISOString() + ']   Frame time: ' + String(Date.now() - lastSend) + "ms");
    lastSend = Date.now();

    for (let y = 0; y < frameBuffer.length; y++) {
        for (let x = 0; x < frameBuffer[0].length; x++) {
            setPixelMethod(x, y, frameBuffer[y][x]);
        }
    }
    updateMethod(sendCbk);
}

function start() {
    for (let y = 0; y < pixelHeight; y++) {
        frameBuffer[y] = [];
        for (let x = 0; x < pixelWidth; x++) {
            frameBuffer[y][x] = [0, 0, 0];
        }
    }
    server = net.createServer((socket) => {
        socket.on('error', (err) => {
            console.log(err);
        });
        socket.on('data', (data) => {
            if (data) {
                let packets = data.toString().replace('\r', '').split('\n');
                packets.forEach(packet => handlePFPacket(socket, packet))
            }
        });
    });

    server.listen({ host: '0.0.0.0', port: 1337 }, async () => {
        console.log('Matelight Pixelflut Server started on ' + await getIPAddr() + ':' + 1337)
        setTimeout(send, 100);
    });
}

function close() {
    socket.close();
}


module.exports = function (opts) {
    constructor(opts);
    return {
        start,
        close
    }
}

