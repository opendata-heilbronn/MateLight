 
module.exports = function (options) {

    var _sampleOptions = {
        width: 2,
        height: 2,
        pattern: "horizontalSerpentine", // verticalSerpentine, mapped
        map: [
            [3,4],
            [2,1]
        ]
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
    var width = 0;
    var height = 0;

    var validatePixel = function (pixel) {
        if (pixel &&
            pixel.position &&
            pixel.position.x &&
            pixel.position.y &&
            pixel.color &&
            pixel.color.red &&
            pixel.color.green &&
            pixel.color.blue) {
            return true;
        }

        return false;
    };

    var contructor = function (config) {
        if (!config.sizeX) throw new Error("Missing sizeX in config.");
        if (!config.sizeY) throw new Error("Missing sizeY in config.");
        if (!config.orientation) throw new Error("Missing orientation in config.");
        
        if(config.orientation == "landscape") {
            if (config.sizeX % 5 != 0) throw new Error("Using orientation=landscape sizeX must be a multiple of 5.");
            if (config.sizeY % 4 != 0) throw new Error("Using orientation=landscape sizeY must be a multiple of 4.");
        }

        if(config.orientation == "portait") {
            if (config.sizeX % 4 != 0) throw new Error("Using orientation=landscape sizeX must be a multiple of 4.");
            if (config.sizeY % 5 != 0) throw new Error("Using orientation=landscape sizeY must be a multiple of 5.");
        }

        width = config.sizeX;
        height = config.sizeY;
    };


    function send() {
        
    };

    function setPixel(pixel) {
        if (!validatePixel(pixel)) { return {error: ["pixel is not valid"]}; }

        var existing = pixels.filter(function(item) {
           return item.x === pixel.x && item.y === pixel.y;
        });

        if (existing)
           existing.color = pixel.color;
        else
         pixels.push(pixel);
    };

    function setList() {

    };

    function setArray() {
    };

    contructor(options);

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
