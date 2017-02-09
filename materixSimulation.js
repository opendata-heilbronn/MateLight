var xSize = 10, ySize = 8;

var buf = [];

for(var y = 0; y < ySize; y++) {
    buf[y] = [];
    for(var x = 0; x < xSize; x++) {
        buf[y][x] = [0, 0, 0];
        //setPixel(x, y, [0,0,0]);
    }
}

function setPixel(x, y, color) {
    if(x >= 0 && x < xSize && y >= 0 && y < ySize)
        buf[y][x] = color;
}

function bwOn(x, y) { //returns if pixel is on (hard black & white)
    var c = buf[y][x];
    var sum = c[0] + c[1] + c[2];
    return sum > 382; //if "brighter" than 50%
}

function update() {
    console.log("\n\n\n\n");
    for(var y = 0; y < ySize; y++) {
        var tmpStr = ""
        for(var x = 0; x < xSize; x++) {
            tmpStr += bwOn(x, y) ? '# ' : '. ';
        }
        console.log(tmpStr);
    }
}

function stop() {
    clearInterval(updateInterval);
}

var updateInterval = setInterval(update, 100);

module.exports = {setPixel, stop};
