var SerialPort = require('serialport');
var serialport = new SerialPort('/dev/ttyACM0', {
  baudrate: 9600,
  parser: SerialPort.parsers.readline("\n")
});

serialport.on('open', function() {
  console.log('serial port opened');
});

module.exports = serialport;
