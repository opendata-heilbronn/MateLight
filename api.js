const express = require('express');
var app = express();

const Materix = require('./src/materix.module');
const Hardware = require('./src/materixHardware.module');
const ScrollText = require('./src/scrollText.module');

var hardware = null, materix = null, scrollText = null;

var config =  {
    serialDevice: '/dev/ttyUSB0',
    baudRate: 500000,
    width: 7,
    height: 2,
    orientation: "landscape",
    scrollCallback: null
};

function init(conf) {
    hardware = new Hardware({serialDevice: conf.serialDevice, baudRate: conf.baudRate});
    materix = new Materix({width: conf.width, height: conf.height, orientation: conf.orientation, handler: hardware});
    scrollText = new ScrollText({setPixelMethod: materix.setPixel, updateMethod: materix.send, onEnd: conf.scrollCallback});
}


module.exports = {
    app
};