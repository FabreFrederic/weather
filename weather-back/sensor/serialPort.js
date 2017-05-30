var SerialPort = require('serialport');

const port = '/dev/ttyACM0';
var serialport = new SerialPort(port, {
    baudrate: 9600,
    parser: SerialPort.parsers.readline("\n")
});

serialport.on('error', function(err) {
  console.log('serialport error while opening the port : ' + port, err);
  process.exit(1);
});

serialport.on('open', function() {
  console.log('serial port opened');
});

module.exports = serialport;
