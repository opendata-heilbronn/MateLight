 
module.exports = function (options) {

    var _sampleOptions = {
        width: 2,   //in boxes
        height: 2,
        orientation: "landscape", //orientation of boxes
        pattern: "horizontalSerpentine", // verticalSerpentine, mapped (box connection pattern)
        start: "right", //
        /*map: [ //will be generated
            [2,3],
            [1,0]
        ]*/
    };

    var _sampleBox = {
        orientation: "landscape", // portrait
        rotation: "normal", // inverse - normal -> Stecker oben, inverse -> Stecker unten
        position: {
            x: 0,
            y: 0
        }
    };

    var _samplePixel = {
        position: {
            x: 0,
            y: 0
        },
        color: {
            red: 255,
            green: 0,
            blue: 0
        },

    };

    var pixels = [];
    var boxMap = [];
    var ledMap = [];
    var width = 0, height = 0;
    var pixelWidth = 0, pixelHeight = 0;
    const serpentine = [
        15, 16, 17, 18, 19,
        14, 13, 12, 11, 10,
         5,  6,  7,  8,  9,
         4,  3,  2,  1,  0
    ];

    var constructor = function (config) {
        if (!config.width) throw new Error("Missing width in config.");
        if (!config.height) throw new Error("Missing height in config.");
        if (!config.orientation) throw new Error("Missing orientation in config.");

        width = config.width;
        height = config.height;
        pixelWidth = (config.orientation == "landscape") ? config.width * 5 : config.width * 4; //generate pixelWidth (x) & pixelHeight (y)
        pixelHeight = (config.orientation == "landscape") ? config.height * 4 : config.height * 5;

        //fill pixel array with black
        for(var i = 0; i < pixelWidth*pixelHeight; i++) {
            pixels[i] = [0, 0, 0];
        }

        //generate boxMap
        var y = height - 1;
        var x = width - 1;
        var rot = "normal";
        var incrementer = -1;
        for(var i = 0; i < width*height; i++) {
            boxMap[i] = {position: {x: x, y:y}, orientation: config.orientation, rotation: rot};
            x += incrementer;
            if(x >= width) {
                rot = "normal";
                incrementer = -1;
                x--; //compensate "overshoot" (reset from width to width-1 (start at 0))
                y--; //go one row higher
            }
            else if(x < 0) {
                rot = "inverse";
                incrementer = 1;
                x++; //compensate "overshoot"
                y--;
            }
        }

        //generate ledMap

        for(var box = 0; box < boxMap.length; i++) {
            //generate serpentine map (or load from constant)
            //and use offset for led
            var pattern;
            ledMap[box*20];
        }
    };

    function flatToXY(flatVal) {
        return {x: flatVal % width, y: flatVal / width};
    }

    function xyToFlat(x, y) {
        return y*width+x;
    }


    function send() {
        //send data out to hardware
        //TODO: crunch data (pixel data to led data with respect to cabling)
    };



    var validatePixel = function (pixel) {
        return (pixel != undefined &&
        pixel.position != undefined &&
        pixel.position.x != undefined &&
        pixel.position.y != undefined &&
        pixel.color != undefined &&
        pixel.color.red != undefined &&
        pixel.color.green != undefined &&
        pixel.color.blue != undefined);
    };


    function setPixel(pixel) {
        if (!validatePixel(pixel))
            throw new Error('pixel is not valid');

        var arrIndex = (pixel.position.y * width) + pixel.position.x;
        pixels[arrIndex] = [pixel.color.red, pixel.color.green, pixel.color.blue];
    };

    function setList() {

    };

    function setArray() {
    };

    constructor(options);

    return {
        send: send,
        setPixel: setPixel,
        setList: setList,
        setArray: setArray,
        getWidth: function() { return width; },
        getHeight: function() { return height; },
        getPixels: function() { return pixels; },
    };
};
