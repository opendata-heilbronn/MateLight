#include "FastLED.h"

unsigned char inputBuffer[60];
unsigned char inCounter=0;

unsigned long lastPacket=0;

const int NUM_LEDS = 20;
const int DATA_PIN = 2;

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(115200);
  FastLED.addLeds<WS2811, DATA_PIN, RGB>(leds, NUM_LEDS);
}

void parseBuffer()
{
  for (byte i = 0; i < 60; i++)
  {
    leds[i/3][i%3] = inputBuffer[i];
    //Serial.print(inputBuffer[i], HEX);
  }
  //Serial.println();
}



void loop() {
  while (Serial.available()) {
    lastPacket = millis();
    unsigned char incomingByte = Serial.read();
    if(inCounter < 60)
    {
      inputBuffer[inCounter] = incomingByte;
      inCounter++;
    }
    else
    {
      Serial.write(incomingByte);
    }
  }

  if(millis() - lastPacket > 5 && inCounter > 0)
  {
    inCounter = 0;
    parseBuffer();
    FastLED.show();
  }
}

