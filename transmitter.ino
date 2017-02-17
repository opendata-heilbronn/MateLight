unsigned long lastTransmit = 0;
int refreshTime = 3000;
const int bytesToSend = 3 * 20 * 56;
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
/* modes:
 * 1=strobo
 * 2=constantColors
 * 3=other color pattern
 * 4=random pattern
 * 5 = brainfuck
 * 6=chasing dot
 * 7=fps
 */
byte mode = 7; 

byte colCtr=0;
unsigned int byteCounter = 0, frameCount = 0, fps = 0;
unsigned long lastCalculation = 0;

void loop() {
  if(micros() - lastTransmit >= refreshTime)
  {
    for (int i = 0; i < bytesToSend; i++) {
      switch(mode)
      {
        case 1:
          Serial.write(colCtr == 0 ? 255 : 0);
          break;
        case 2:
          Serial.write(colors[i%24]/16);
          break;
        case 3:
          Serial.write((i*64)%256);
          break;
        case 4:
          Serial.write(random(0,8)*32);
          break;
        case 5:
          Serial.write((byteCounter%8 == i%8)*255);
          break;
        case 6:
          Serial.write((byteCounter%70 == i%70)*255);
          break;
        case 7:
          if(i < 8*3) {
            Serial.write(((fps >> (i/3)) & 1) * 32);
          }
          else {
            //Serial.write(colors[i%24]/16);
            Serial.write(1);
            delayMicroseconds(8);
          }
          break;
      }
      //delayMicroseconds(16);
    }
    frameCount++;
    colCtr = colCtr < 3 ? colCtr + 1 : 0;
    byteCounter = byteCounter < bytesToSend ? byteCounter + 1 : 0;
    lastTransmit = micros();
  }
  //delayMicroseconds(refreshTime);
  if(millis()-lastCalculation >= 1000 && frameCount > 0) {
    fps = frameCount;
    frameCount = 0;
    lastCalculation = millis();
  }
}
