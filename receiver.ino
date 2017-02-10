#include "FastLED.h"

unsigned char inputBuffer[60];
unsigned char inCounter=0;

unsigned long lastPacket=0;

const int NUM_LEDS = 20;
const int DATA_PIN = 2;
const int timeout = 500;

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(1000000);
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
    lastPacket = micros();
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

  if(micros() - lastPacket > timeout && inCounter > 0)
  {
    inCounter = 0;
    parseBuffer();
    FastLED.show();
  }
}

