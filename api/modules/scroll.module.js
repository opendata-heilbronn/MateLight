
const Materix = require('./../materix.module');
const Hardware = require('./../materixHardware.module');
const ScrollText = require('./../scrollText.module');
const Pixel = require('./../models/pixel.model');

module.exports = function (options) {

    this.hardware = new Hardware({ serialDevice: options.device, baudRate: 500000 });
    this.width = options.width;
    this.height = options.height;
    this.materix = new Materix({ width: width, height: height, orientation: options.orientation, handler: hardware });
    this.scrollText = new ScrollText({ setPixelMethod: materix.setPixel, updateMethod: materix.send, onEnd: scroll });

    this.start = () => {
        
        for (var y = 0; y < this.height * 4; y++)
            for (var x = 0; x < this.width * 5; x++)
                this.materix.setPixel(x, y, [0, 0, 32]);
                
        this.scrollText.setText({
            text: options.text,
            startY: 0,
            endX: options.width * 5 - 1,
            //scrollSpeed: 68,
            scrollSpeed: 68,
            textColor: [255, 0, 0],
            backColor: [0, 0, 32]
        });
    }

    setTimeout(scroll, 100);

}