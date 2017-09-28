var SerialPort = require('serialport');
var port = new SerialPort('/dev/serial0', {
  baudRate: 115200
});

var write = function () {
    for (var i = 0; i < 240; i++) {
        var buffer = new Buffer(1);
        buffer[0] = Math.random(i) * 200; 
        
        port.write(buffer, function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
        });
    }

    console.log("frame ending");
    setTimeout(write, 20);    
};


port.on('open', function () {
    setTimeout(write, 20);
});

// open errors will be emitted as an error event
port.on('error', function (err) {
    console.log('Error: ', err.message);
})