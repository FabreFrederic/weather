const morgan = require('morgan');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')( http );
const path = require('path');
const bodyParser = require('body-parser');

const serialport = require('./sensor/serialPort');

const frontBuildFolderPath = '../weather-front/build/';

// Log the requests using morgan
app.use(morgan('dev'));

// Point static path to the front build folder
app.use(express.static(path.join(__dirname, frontBuildFolderPath)));
app.use(bodyParser.json());

temperature = new Object();

io.on('connection', function(socket) {
  console.log('user connection');

  serialport.on('data', function(data) {
    temperature.temperature = Number(data[0]);
    temperature.date = new Date();
    console.log(temperature);
    io.emit('temperature-message', temperature);
  });

  serialport.on('close', function(err) {
    console.log('serial port closed', err);
  });
});

io.on('disconnect', function(socket) {
  console.log('user disconnected');
  serialport.close();
});

// Get port from environment and store in Express.
const port = process.env.PORT || '8085';
http.listen(port, "0.0.0.0");
