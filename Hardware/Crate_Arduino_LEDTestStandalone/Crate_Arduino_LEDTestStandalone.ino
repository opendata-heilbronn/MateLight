#include "FastLED.h"

const int NUM_LEDS = 24;
const int DATA_PIN = 2;

CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<WS2811, DATA_PIN, RGB>(leds, NUM_LEDS);
}


void loop() {
  for(byte i = 0; i < NUM_LEDS; i++) {
    byte hue = map(i, 0, NUM_LEDS-1, 0, 255) + millis()/50;
    leds[i] = CHSV(hue, 255, 255);
  }
  FastLED.show();
  delay(50);
}

