var SerialPort = require('serialport');
var port;

var isOpen = false;

function constructor(opts) {
    if(opts.baudRate == undefined) throw new Error('no baudrate supplied');
    if(opts.serialDevice == undefined) throw new Error('no serialDevice supplied');


    port = new SerialPort(opts.serialDevice, {
        baudRate: opts.baudRate
    });

    port.on('error', function(err){
        throw err;
    });

    port.on('open', function() {
    });

    port.on('disconnect', function(e) {
        console.log("Serial port disconnected");
    })
}


function sendPixels(rawData) { //accepts a flat byte array
    if(port.isOpen()) {
        port.write(rawData, function(err){ //TODO: check if works, maybe wants a buffer insetead of array
            if(err) {
                throw new Error(err);
            }
        })
    }
    else throw new Error('port is not open (yet)');
}

module.exports = function(opts) {
    constructor(opts);
    return {
        sendPixels,
        isReady: () => port.isOpen(),
    }
}