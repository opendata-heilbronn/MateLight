
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

    var colors = {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m"
    }

    var colorArr = [
        colors.black,
        colors.red,
        colors.green,
        colors.yellow,
        colors.blue,
        colors.magenta,
        colors.cyan,
        colors.white,
    ]

    var colorMap = [
        [0, 0, 0],
        [255, 0, 0],
        [0, 255, 0],
        [255, 255, 0],
        [0, 0, 255],
        [255, 0, 255],
        [0, 255, 255],
        [255, 255, 255]
    ]

    var pixelChars = [
        /*'-', '+',*/ '░', '▒', '▓', '█'
    ];

    var pixels = [];
    var width = 0, height = 0;
    var pixelWidth = 0, pixelHeight = 0;
    var boxPixelWidth = 0, boxPixelHeight = 0;

    var constructor = function (config) {
        if (!config.width) throw new Error("Missing width in config.");
        if (!config.height) throw new Error("Missing height in config.");

        width = config.width;
        height = config.height;
        boxPixelWidth = (config.orientation == "landscape") ? 5 : 4;
        boxPixelHeight = (config.orientation == "landscape") ? 4 : 5;
        pixelWidth = config.width * boxPixelWidth; //generate pixelWidth (x) & pixelHeight (y)
        pixelHeight = config.height * boxPixelHeight;

        //fill pixel array with black
        for (var y = 0; y < pixelHeight; y++) {
            pixels[y] = [];
            for (var x = 0; x < pixelWidth; x++) {
                pixels[y][x] = [0, 0, 0];
            }
        }

        console.log('\033[2J'); //clear screen
    };

    process.on('SIGINT', () => {
        console.log(colors.white);
        process.exit();
    });

    function getColoredChar(color) {
        let r = color[0], g = color[1], b = color[2];

        let colorStr = "";
        let intensityChar = "";
        let minDist = 255 * 3;
        let intensitySteps = pixelChars.length;

        //search for nearest color
        for (let i = 0; i < 8; i++) { //loop through colors
            let c = colorMap[i]
            for (let j = 1; j <= intensitySteps; j++) { //loop through intensities
                iFact = j / intensitySteps;
                distance = Math.abs(c[0] * iFact - r) + Math.abs(c[1] * iFact - g) + Math.abs(c[2] * iFact - b);
                if (distance < minDist) {
                    minDist = distance;
                    colorStr = colorArr[i];
                    intensityChar = pixelChars[j - 1];
                }
            }
        }

        return colorStr + intensityChar + intensityChar;
    }


    function send(callback) {
        let printStr = "\033[0;0H"; //move cursor to 0/0
        for (var y = 0; y < pixelHeight; y++) {
            for (var x = 0; x < pixelWidth; x++) {
                printStr += getColoredChar(pixels[y][x]);
            }
            printStr += '\n';
        }
        printStr += '\n' + colors.white;
        console.log(printStr);

        if (callback)
            callback();
    };

    function setPixel(x, y, color) {
        pixels[y][x] = color;
    };

    function setList() {
        //TODO: implement
    };

    function setArray() {
        //TODO: implement
    };

    constructor(options);

    return {
        send: send,
        setPixel: setPixel,
        setList: setList,
        setArray: setArray,
        getWidth: function () { return width; },
        getHeight: function () { return height; },
        getPixelWidth: function () { return pixelWidth; },
        getPixelHeight: function () { return pixelHeight; },
        getPixels: function () { return pixels; },
        getLedMap: () => ledMap
    };
};