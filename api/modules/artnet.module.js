/**
 * Created by Leandro on 22.08.2017.
 */

const dgram = require('dgram');
let socket;

function listen(port, callback) {
    socket = dgram.createSocket('udp4', (msg, rinfo) => {
        let seq = msg.readUInt8(12, true);
        let phy = msg.readUInt8(13, true);
        let uni = msg.readUInt8(14, true);
        let len = msg.readUInt16BE(16, true);
        let raw = [];

        for (let i = 18; i < 18 + len; i++) {
            raw.push(msg.readUInt8(i));
        }

        let ret = {sequence: seq, physical: phy, universe: uni, length: len, data: raw};

        callback(ret, rinfo);
    });
    socket.bind(port, '0.0.0.0');
}

function close() {
    socket.close()
}

module.exports = {
    listen,
    close
};