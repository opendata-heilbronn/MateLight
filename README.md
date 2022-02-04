# Matelight

(https://opendata-heilbronn.github.io/MateLight/)


# Software Documentation
## [API](Raspberry_Pi/materix_API) Documentation
The Matelight "API" is written in nodeJS and can be used in other scripts.

### Scripts
Some scripts have already been created. They are located at [Raspberry_Pi/materix_API/api/scripts](Raspberry_Pi/materix_API/api/scripts).
- fromBitmap.js
    - Takes a bitmap and displays it on the Matelight
- testScroll.js
    - Displays a scrolling text on the Matelight
- glediatorBridge.js
    - Takes ArtNet packages and displays them on the matelight
    - Every crate row is one ArtNet universe. The channels start in the top left and travel down line wise
    - This mapping has to be set up in gLEDiator, or any other ArtNet sender
- pixelflut.js
    - exposes a [Pixelflut](https://cccgoe.de/wiki/Pixelflut) server on port 1337

Examples of how to launch the scripts can be found in the [scripts README](Raspberry_Pi/materix_API/api/scripts/README.md).


### Future plans
- HTTP API
- Create one central API that runs all the time and accepts input from multiple scripts


# Hardware Documentation
## Topology
The centerpiece of the installation is a Raspberry Pi with a USB to Serial adapter and a 12V server power supply.  
We didn't use the hardware serial of the Rapsberry Pi directly, because we already destroyed a Raspberry Pi by inducing voltage spikes or something like that.

### XLR pinout
The serial TX and 12V from the power supply get connected to the pins of a XLR plug like this:
1. +12V
2. GND
3. Serial Data

This plug is then connected to the first crate. 

We also made some intermediary cables to feed the power to multiple points in the matrix to reduce the current flowing through the XLR plugs.  
These were built just like normal pass-through cables, but with an extra XLR plug added for injecting 12V.

## Building a crate
### Materials needed

| Amount     | Article                     | Approx. Price | Links                                                                              |
| ---------- | --------------------------- | ------------- | ---------------------------------------------------------------------------------- |
| 1          | Club Mate Crate             | 4.50€         |
| 1          | Arduino Pro Mini 5V         | 1.50€         | [AliExpress](https://www.aliexpress.com/wholesale?SearchText=arduino+pro+mini+5v)  |
| 20/50 LEDs | 12mm WS2811 LED String      | 5€            | [AliExpress](https://www.aliexpress.com/wholesale?SearchText=ws2811+12mm)          |
| 1          | LM2596S Step Down           | 1€            | [eBay](https://www.ebay.de/sch/i.html?_nkw=LM2596S)                                |
| 1          | XLR panel mount jack male   | 2€            | [eBay](https://www.ebay.de/sch/i.html?_nkw=xlr+einbaubuchse+male)                  |
| 1          | XLR panel mount jack female | 2€            | [eBay](https://www.ebay.de/sch/i.html?_nkw=xlr+einbaubuchse+female)                |
| 1          | XLR microphone cable 0.5m   | 3€            | [eBay](https://www.ebay.de/sch/i.html?_nkw=0%2C5m+mikrofonkabel)                   |
| 24/40 pins | Female header               | 0.10€         | [AliExpress](https://www.aliexpress.com/wholesale?SearchText=female+header+40+pin) |
| Some       | Plywood                     |               |
| Some       | Cardboard                   |               |


### Instructions

1. Clean out all bottles
2. Wrap the bottles in aluminum foil and secure it with tape
3. Put a LED into each bottle following this pattern:  
    ```
            (seen from back, ↥ top ↥)
           ╔═══════════════════════════╗
           ║ ○  →  ○     ○  →  ○     ○ ║ →{out}
           ║ ↑     ↓     ↑     ↓     ↑ ║
           ║ ○     ○     ○     ○     ○ ║
           ║ ↑     ↓     ↑     ↓     ↑ ║
           ║ ○     ○     ○     ○     ○ ║
           ║ ↑     ↓     ↑     ↓     ↑ ║
    {in} → ║ ○     ○  →  ○     ○  →  ○ ║
           ╚═══════════════════════════╝
                   (↧ bottom ↧)
    ```
4. Solder female headers for the Arduino to a piece of prototyping board
5. Build the wooden back plate (schematics coming soon)
6. Drill holes and screw the XLR Sockets in (male left, female right)
7. Glue the buck converter and prototyping board from the inside to the wood
8. Follow the [wiring steps](docs/img/wiringStepByStep/README.md)
9. Put cardboard padding between the bottles and the wood plate
10. Screw the wood plate onto the crate
11. Flash the firmware onto the Arduino 
    - chose the correct firmware from [Crate_Arduino_Receiver](Hardware/Crate_Arduino_Receiver) by the amount of bottles in a crate
12. Connect all crates together with XLR cables in a serpentine pattern like this:
    ```
                 (back side of array)
           [ ] → [ ] → [ ] → [ ] → [ ] → [ ] → [ ]
            ↑
           [ ] ← [ ] ← [ ] ← [ ] ← [ ] ← [ ] ← [ ]   (<- this row of crates is flipped 180°)
                                                ↑
    {in} → [ ] → [ ] → [ ] → [ ] → [ ] → [ ] → [ ]
    ```
