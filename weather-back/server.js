const morgan = require('morgan');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')( http );
const path = require('path');
const bodyParser = require('body-parser');

const temperatureController = require('./controller/temperatureController');

// Get port from environment and store in Express.
const port = process.env.PORT || '8085';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log the requests using morgan
app.use(morgan('dev'));

// Temperature rest service
app.use('/temperature', temperatureController);

// Point static path to the front build folder
const frontBuildFolderPath = '../weather-front/build/';
app.use(express.static(path.join(__dirname, frontBuildFolderPath)));

// Sensor connection and socket
const serialport = require('./sensor/serialPort');
let temperature = new Object();

io.on('connection', function(socket) {
  console.log('user connection');

  serialport.on('data', function(data) {
    temperature.temperature = Number(data);
    temperature.date = new Date();
    console.log(temperature);
    io.emit('temperature-message', temperature);
    createTemperature(temperature.temperature).then(function (result) {
        // console.log(temperature);
    }).catch(function (err) {
        console.log('Error, temperature not persisted : ', temperature.temperature);
    });
  });

  serialport.on('close', function(err) {
    console.log('serial port closed', err);
  });
});

io.on('disconnect', function(socket) {
  console.log('user disconnected');
  serialport.close();
});

// Server
var server = app.listen(port, "0.0.0.0", function() {
  console.log('Express server listening on port ' + port);
});
