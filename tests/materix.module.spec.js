var chai = require('chai');
var expect = chai.expect;
var Materix = require('./../src/materix.module');
const Pixel = require('../src/models/pixel.model');

describe('Materix Module', function () {
   var materix = null;
   var width = 2;
   var height = 2;


   beforeEach(function () {
      materix = new Materix({ width: width, height: height, orientation: "landscape" });
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
         color: { red: 255, green: 0, blue: 0 },
         position: { x: 0, y: 0 }
      };
      var pixel = new Pixel(options);

      var result = materix.setPixel(pixel);

      console.log(result);

      var pixels = materix.getPixels();

      console.log(JSON.stringify(pixels));

      expect(pixel.length > 0).to.be.true;
   });
});