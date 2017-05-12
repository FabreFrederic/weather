const int debit = 9600;
int count = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(debit);
}

void loop() {
  // put your main code here, to run repeatedly:
  count++;
  Serial.println(count);

  if (count > 14) {
    count = 0;
  }

  delay(1000);
}
