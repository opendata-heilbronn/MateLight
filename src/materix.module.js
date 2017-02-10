 
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
    var width = 0, height = 0;
    var pixelWidth = 0, pixelHeight = 0;

    var contructor = function (config) {
        if (!config.width) throw new Error("Missing width in config.");
        if (!config.height) throw new Error("Missing height in config.");
        if (!config.orientation) throw new Error("Missing orientation in config.");

        width = config.width;
        height = config.height;
        pixelWidth = config.orientation == "landscape" ? config.width * 5 : config.width * 4; //generate pixelWidth (x) & pixelHeight (y)
        pixelHeight = config.orientation == "landscape" ? config.height * 4 : config.height * 5;

        //fill pixel array with black
        for(var i = 0; i < pixelWidth*pixelHeight; i++) {
            pixels[i] = [0, 0, 0];
        }

        //generate boxMap
        var y = height - 1;
        var x = 0;
        var rot = "normal";
        var incrementer = 1;
        for(var i = 0; i < width*height; i++) { //TODO: DEBUG THIS!!!
            boxMap[i] = {x: x, y:y, orientation: config.orientation, rotation: rot};
            console.log(i, x, y);
            x += incrementer;
            if(x >= width) {
                rot = "inverse";
                incrementer = -1;
                y--;
            }
            else if(x <= 0) {
                rot = "normal";
                incrementer = 1;
                y--;
            }

        }
    };


    function send() {
        
    };

    var validatePixel = function (pixel) {
        return !!(pixel != undefined &&
        pixel.position != undefined &&
        pixel.position.x != undefined &&
        pixel.position.y != undefined &&
        pixel.color != undefined &&
        pixel.color.red != undefined &&
        pixel.color.green != undefined &&
        pixel.color.blue != undefined);
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
