const express = require('express');
var io = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);

// Get port from environment and store in Express.
const port = process.env.PORT || '8085';
const portIo = '8086';

const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const runScheduler = require('./scheduler/scheduler');
const temperatureController = require('./controller/temperatureController');

io = io.listen(portIo, server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log the requests using morgan
app.use(morgan('dev'));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Temperature rest service
app.use('/temperature', temperatureController);

// Point static path to the front build folder
const frontBuildFolderPath = '../weather-front/build/';
app.use(express.static(path.join(__dirname, frontBuildFolderPath)));

// Sensor connection and socket
// const serialport = require('./sensor/serialPort');

let temperature = new Object();

io.on('connection', function(socket) {
  console.log('user connection');

  // TODO : move in a specific test file
  // To test only, generate random temperatures reading every sec

  runScheduler(function() {
    temperature.temperature = Math.floor(Math.random() * 10);
    temperature.date = new Date();
    io.emit('temperature-message', temperature);

    temperatureController.createTemperature(temperature.temperature).then(function (result) {
       // console.log('New temperature persisted : ', temperature);
    }).catch(function (err) {
        console.log('Error, temperature not persisted : ', temperature.temperature);
    });
  });

  // serialport.on('data', function(data) {
  //   temperature.temperature = Number(data);
  //   temperature.date = new Date();
  //   console.log(temperature);
  //   io.emit('temperature-message', temperature);
  //   temperatureController.createTemperature(temperature.temperature).then(function (result) {
  //       // console.log(temperature);
  //   }).catch(function (err) {
  //       console.log('Error, temperature not persisted : ', temperature.temperature);
  //   });
  // });
  //
  // serialport.on('close', function(err) {
  //   console.log('serial port closed', err);
  // });
});

// io.on('disconnect', function(socket) {
//   console.log('user disconnected');
//   serialport.close();
// });

// Server
app.listen(port, "0.0.0.0", function() {
  console.log('Express server listening on port ' + port);
});
