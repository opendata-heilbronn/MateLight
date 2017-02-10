unsigned long lastTransmit = 0;
int refreshTime = 3000;
unsigned char colors[24] = {
    0,   0,   0,
    0,   0, 255,
    0, 255,   0,
  255,   0,   0,
  255, 255,   0,
    0, 255, 255,
  255,   0, 255,
  255, 255, 255
};


void setup() {
  Serial.begin(1000000);
}

byte colCtr=0;

byte mode = 2; //1=strobo, 2=constantColors, 

void loop() {
  if(micros() - lastTransmit >= refreshTime)
  {
    for (int i = 0; i < 480; i++) {
      switch(mode)
      {
        case 1:
          Serial.write(colCtr == 0 ? 255 : 255);
          break;
        case 2:
          Serial.write(colors[i%24]);
          break;
      }
    }
    colCtr++;
    if(colCtr > 2)
      colCtr = 0;
    lastTransmit = micros();
  }
  //delay(refreshTime);
}
