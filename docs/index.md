# Was ist das MateLight?

Das MateLight ist eine interaktive LED-Installation. Es besteht aus RGB-LEDs und Club-Mate-Kästen. 
Damit ergibt sich ein Raster mit bunten Punkten. Also quasi ein Display.


Das MateLight ist klassischer Nerd-Shit. Es erfüllt keinen wirklich sinnvollen Zweck und wurde geschaffen, weil man es kann.
Aber für ein paar Dinge kann man es schon verwenden. Es kann z.B. hervoragend als Effektbeleuchtung bei Veranstaltungen
eingesetzt werden. Außerdem ist es ein tolles Spielzeug für Programmier-Padawane. Man jage ein paar Zahlen hinein
und betrachte die bunt blinkende Welt.
       
       
# Wo kann ich das MateLight sehen?
 
Auf der MakerFaire in Hannover

Oder an jedem Coding-Donnerstag im [Maker Space](https://makerspace.experimenta.science)


# Made at code for Heilbronn</h2>

<img src="/img/CodeForHeilbronn.svg" />

Das MateLight wurde von den Teilnehmern der Coding-Abende bei [CodeFor Heilbronn](https://codeforheilbronn.de/) entwickelt und hergestellt.


# Contributors

img/contributors/theVale98.jpg
* TheVale98
    * Hardware

img/contributors/LeoDJ.jpg
* LeoDJ
    * Hardware, Software

img/contributors/Franz.jpg

* Franz
    * Hardware

'img/contributors/harmoniemand.jpg
* Jonathan
    * Software



# Wie kann ich helfen?

Hilfe können wir immer brauchen um neue Kästen zu bauen. Dazu sollte man löten können.
Wir treffen und immer Donnerstags. Zwar wird nicht immer und ausschließlich am MateLight gearbeitet, aber 
immer öfter.

Außerdem kann das MateLight um coole neue Funktionen erweitert werden. Seien es Spiele oder der geplante Webservice.
Dazu sollte man NodeJS oder Arduino (C++) programmieren können.


# Wiring Instructions Step by Step
Start with the following plywood plate:

![](img/wiringStepByStep/step00.jpg)

### Step 1
Connect the 12V power passthrough cable

![](img/wiringStepByStep/step01.jpg)

### Step 2
Connect the 12V power from the XLR input

![](img/wiringStepByStep/step02.jpg)

### Step 3
Connect the regulated 5V to the Arduino 5V/VCC pin

![](img/wiringStepByStep/step03.jpg)

### Step 4
Connect XLR data in and GND to Arduino RX and GND pins

![](img/wiringStepByStep/step04.jpg)

### Step 5
Connect the Arduino TX pin to XLR data out

![](img/wiringStepByStep/step05.jpg)

### Step 6
Connect the 5V power wires for the LEDs to the buck converter

![](img/wiringStepByStep/step06.jpg)

### Step 7
Connect the LED data wire to Arduino pin 2
![](img/wiringStepByStep/step07.jpg)

### Step 8
Connect the three open cables from step 7 to the input of LED string accordingly
