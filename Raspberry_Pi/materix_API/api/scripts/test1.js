const ml = require('./_matelight');
let materix = ml.materix, args = ml.args;

setTimeout(function() {
    materix.setPixel(0, 0, [255, 0, 0]);
    materix.setPixel(1, 1, [0, 255, 0]);
    materix.setPixel(2, 2, [0, 0, 255]);
    materix.send();
    var i = 0;
    var interval = setInterval(function(){
        materix.setPixel(i%20, Math.floor(i/20), [(i%3==0)*255, (i%3==1)*255, (i%3==2)*255]);
        materix.send();
        if(i == 240) clearInterval(interval);
        i++;
    }, 50);
}, 100);


