#include "FastLED.h"

#define NUM_LEDS 24
#define NUM_BYTES NUM_LEDS*3

const int DATA_PIN = 2;
const int timeout = 500;

unsigned char inputBuffer[NUM_BYTES];
unsigned char inCounter=0;

unsigned long lastPacket=0;

CRGB leds[NUM_LEDS];

void setup() {
  Serial.begin(500000);
  FastLED.addLeds<WS2811, DATA_PIN, RGB>(leds, NUM_LEDS);
}

void parseBuffer()
{
  for (byte i = 0; i < NUM_BYTES; i++)
  {
    leds[i/3][i%3] = inputBuffer[i];
  }
}



void loop() {
  if(Serial.available()) //this method _should_(tm) be a better way of handling high speed Serial input without swallowing bytes
  {
    for(byte i = 0; i < Serial.available(); i++)
    {
      unsigned char incomingByte = Serial.read();
      if(inCounter < NUM_BYTES)
      {
        inputBuffer[inCounter] = incomingByte;
        inCounter++;
      }
      else
      {
        Serial.write(incomingByte);
      }
    }
    lastPacket = micros();
  }

  if(micros() - lastPacket > timeout && inCounter > 0)
  {
    inCounter = 0;
    parseBuffer();
    FastLED.show();
  }
}

