 
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

    function rotate2dArray(arr) { //only does 180° TODO: implement 90° turns for portrait
        var newArr = arr.slice(0); //need slice for copying array instead of referencing
        newArr.reverse();
        newArr.forEach((elem, i) => {
            newArr[i] = arr[i].slice(0);
            newArr[i].reverse();
        });
        return newArr;
    }

    var handler = null;
    var pixels = [];
    var boxMap = [];
    var ledMap = [];
    var width = 0, height = 0;
    var pixelWidth = 0, pixelHeight = 0;
    var boxPixelWidth = 0, boxPixelHeight = 0;
    const serpentine = [
        [ 19, 12, 11,  4,  3, ],
        [ 18, 13, 10,  5,  2, ],
        [ 17, 14,  9,  6,  1, ],
        [ 16, 15,  8,  7,  0  ],
    ];

    var constructor = function (config) {
        if (!config.width) throw new Error("Missing width in config.");
        if (!config.height) throw new Error("Missing height in config.");
        if (!config.orientation) throw new Error("Missing orientation in config.");
        if (!config.handler) throw new Error("No Materix Hardware handler was supplied.");

        handler = config.handler;
        width = config.width;
        height = config.height;
        boxPixelWidth = (config.orientation == "landscape") ? 5 : 4;
        boxPixelHeight = (config.orientation == "landscape") ? 4 : 5;
        pixelWidth = config.width * boxPixelWidth; //generate pixelWidth (x) & pixelHeight (y)
        pixelHeight = config.height * boxPixelHeight;


        //fill pixel array with black
        for(var y = 0; y < pixelHeight; y++) {
            pixels[y] = [];
            for(var x = 0; x < pixelWidth; x++) {
                pixels[y][x] = [0, 0, 0];
            }

        }

        //generate boxMap
        for(var y = 0; y < height; y++) { //initialize 2D Array
            boxMap[y] = [];
        }
        var y = height - 1;
        var x = width - 1;
        var rot = "normal";
        var incrementer = -1;
        for(var i = 0; i < width*height; i++) {
            boxMap[y][x] = {position: i, orientation: config.orientation, rotation: rot};
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
        for(var y = 0; y < pixelHeight; y++) { //initialize 2D Array
            ledMap[y] = [];
        }
        for(var boxY = 0; boxY < boxMap.length; boxY++) {
            for(var boxX = 0; boxX < boxMap[boxY].length; boxX++) {
                var curBox = boxMap[boxY][boxX];
                var boxOffsetPos = curBox.position * 20;
                var boxOffsetX = boxX*boxPixelWidth;
                var boxOffsetY = boxY*boxPixelHeight;

                if(curBox.orientation === 'portrait') throw new Error('portrait orientation of boxes is not implemented yet'); //TODO: implement portrait orientation
                var rotationCount = (curBox.orientation == 'portrait') + (curBox.rotation == 'inverse')*2; //how many times to rotate the serpentine
                if (rotationCount == 0) //crudely implemented until portrait support
                    var pattern = serpentine;
                else if (rotationCount == 2)
                    var pattern = rotate2dArray(serpentine);

                for(var ledY = 0; ledY < pattern.length; ledY++) { //loop through serpentine pattern inside a box
                    for(var ledX = 0; ledX < pattern[ledY].length; ledX++) {
                        ledMap[boxOffsetY + ledY][boxOffsetX + ledX] = boxOffsetPos + pattern[ledY][ledX];
                    }
                }
            }
        }
    };


    function send() {
        //send data out to hardware
        //TODO: crunch data (pixel data to led data with respect to cabling)
        var rawData = []
        for(var y = 0; y < ledMap.length; y++) {
            for(var x = 0; x < ledMap[y].length; x++) {
                var ledId = ledMap[y][x];
                var pixel = pixels[y][x];
                for(var i = 0; i < 3; i++) {
                    rawData[ledId*3 + i] = pixel[i];
                }
            }
        }
        handler.sendPixels(rawData);

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
        var pos = pixel.position;
        var color = pixel.color;
        pixels[pos.y][pos.x] = [color.red, color.green, color.blue];
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
        getLedMap: () => ledMap,
    };
};
