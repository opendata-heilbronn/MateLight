var chai = require('chai');
var expect = chai.expect;
var Hardware = require('./../src/materixHardware.module');
//const Pixel = require('../src/models/pixel.model');

describe('MaterixHardware Module', function () {
    var hardware = null;


    beforeEach(function () {
        hardware = new Hardware({serialDevice: '/dev/serial0', baudRate: 1000000});
    });

    it('should have an instance', function () {
        expect(hardware).to.not.be.null;
    });

    it('should try to open port', function() {
        expect(hardware.isReady()).to.be.a('boolean');
        setTimeout(function(){
            if(hardware.isReady()) {
                console.log("[should try to open port]", "Serial port could be sucessufully opened");
            }
            else {
                console.log("[should try to open port]", "Serial port could not be opened, probably, because not running on Raspberry Pi");
            }
        }, 100);
    });
});