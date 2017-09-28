void setup() {
  // put your setup code here, to run once:
  Serial.begin(500000);
}

void loop() {
  // put your main code here, to run repeatedly:
  for(byte i = 0; i < Serial.available(); i++)
  {
    Serial.write(Serial.read());
  }
  //delayMicroseconds(128);  
}
