var chai = require('chai');
var expect = chai.expect;
var Materix = require('./../src/materix.module');
const Pixel = require('../src/models/pixel.model');

describe('Materix Module', function () {
    var materix = null;
    var width = 2;
    var height = 2;


    beforeEach(function () {
        materix = new Materix({width: width, height: height, orientation: "landscape"});
    });

    it('should have an instance', function () {
        expect(materix).to.not.be.null;
    });

    it('should be have a width of ' + width, function () {
        expect(materix.getWidth()).to.equal(width);
    });

    it('should be have a height of ' + height, function () {
        expect(materix.getHeight()).to.equal(height);
    });

    it('should set pixel', function () {
        var options = {
            color: {red: 255, green: 0, blue: 0},
            position: {x: 0, y: 0}
        };
        var pixel = new Pixel(options);

       /* var result = materix.setPixel(pixel);

        expect(result.success).to.be.true;*/

        expect(materix.setPixel.bind(materix, pixel)).to.not.throw('pixel is not valid')

        //console.log(result);

        var pixels = materix.getPixels();

        //console.log(JSON.stringify(pixels));

        expect(pixels).to.have.lengthOf(width * height * 20);
        var isPixel = JSON.stringify(pixels[0]);
        var shouldPixel = JSON.stringify([options.color.red, options.color.green, options.color.blue]);
        expect(isPixel).to.equal(shouldPixel);
    });
});