const fs = require('fs');

let width = 3*5;
let height = 7*4;
let ip = '192.168.188.21';
let startingUniverse = 1;
let outputFile = 'MateLight_3x7_patch_PixelBridge.txt';

let numChannels = width * height * 3;
let numUniverses = Math.ceil(numChannels / 510);
let out = '';

out += '#GLEDIATOR Patch File\n';
out += '#Generated by generate_modLED_patching.js\n';
out += `Patch_Matrix_Size_X=${width}\n`;
out += `Patch_Matrix_Size_Y=${height}\n`;
out += `Patch_Num_Unis=${numUniverses}\n`;

for (let i = 0; i < numUniverses; i++) {
    out += `Patch_Uni_ID_${i}_IP1=${ip.split('.')[0]}\n`;
    out += `Patch_Uni_ID_${i}_IP2=${ip.split('.')[1]}\n`;
    out += `Patch_Uni_ID_${i}_IP3=${ip.split('.')[2]}\n`;
    out += `Patch_Uni_ID_${i}_IP4=${ip.split('.')[3]}\n`;
    // gLEDiator expects lower 4 bits of universe in uni, bits 5-8 in subnet and bits 9-15 in net
    let uni = i + startingUniverse;
    out += `Patch_Uni_ID_${i}_Uni_Nr=${uni & 0x0F}\n`;
    out += `Patch_Uni_ID_${i}_Sub_Net_Nr=${uni >> 4}\n`;
    out += `Patch_Uni_ID_${i}_Net_Nr=${uni >> 8}\n`;
    out += `Patch_Uni_ID_${i}_Num_Ch=${i == numUniverses - 1 ? numChannels % 510 : 510}\n`; // last universe might not be fully used
}

let i = 0;

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        out += `Patch_Pixel_X_${x}_Y_${y}_Uni_ID=${Math.floor(i / 510)}\n`;
        out += `Patch_Pixel_X_${x}_Y_${y}_Ch_R=${(i + 0) % 510}\n`;
        out += `Patch_Pixel_X_${x}_Y_${y}_Ch_G=${(i + 1) % 510}\n`;
        out += `Patch_Pixel_X_${x}_Y_${y}_Ch_B=${(i + 2) % 510}\n`;
        i += 3;
    }
}



fs.writeFile(outputFile, out, (err) => {
    if (!err) console.log("Success!");
});