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
const lastTodayTemperatureSocketName = 'last-today-temperature-message';
const todayMinTemperatureSocketName = 'today-min-temperature-message';
const todayMaxTemperatureSocketName = 'today-max-temperature-message';

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

io.on('connection', function(socket) {
  console.log('user connection');

  // serialport.on('data', function(data) {
  //   console.log('data', data);
  //
  //   let newDate = new Date()
  //   let newTemperature = Number(data);
  //
  //   // console.log(temperature);
  //   io.emit('lastTodayTemperatureSocketName',
  //   {'temperature' : Number(data), 'date': new Date());
  //   temperatureController.createTemperature(newTemperature, newDate).then(function (result) {
  //     // Debug only
  //      // console.log('New temperature persisted : ', result);
  //   }).catch(function (err) {
  //       console.log('Error, temperature not persisted : ', err);
  //   });
  // });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  // serialport.on('close', function(err) {
  //   console.log('serial port closed', err);
  // });
});

// TODO : move in a specific test file
// To test only, generate random temperatures reading every sec
runScheduler(function() {
  let newDate = new Date()
  let newTemperature = Math.floor(Math.random() * 10);

  io.emit(lastTodayTemperatureSocketName,
    {'temperature' : newTemperature, 'date': newDate});

  temperatureController.createTemperature(newTemperature, newDate).then(function (result) {
    // Debug only
    // console.log('New temperature persisted : ', result);
  }).catch(function (err) {
      console.log('Error, temperature not persisted : ', err);
  });
});

/**
 * Today minimum temperature reading scheduler
 */
 runScheduler(function() {
   temperatureController.getTodayMinTemperature().then(function (todayMinTemperature) {
    // Debug only
    // console.log('Today minimum temperature reading temperature : ', todayMinTemperature[0].temperature);
    // console.log('Today minimum temperature reading date : ', todayMinTemperature[0].date)
    if (todayMinTemperature[0] !== undefined) {
      io.emit(todayMinTemperatureSocketName,
          {'temperature' : todayMinTemperature[0].temperature, 'date': todayMinTemperature[0].date});
    }
   }).catch(function (err) {
       console.log('Error while finding today minimum temperature : ', err);
   });
 });

 /**
  * Today maximum temperature reading scheduler
  */
  runScheduler(function() {
    temperatureController.getTodayMaxTemperature().then(function (todayMaxTemperature) {
      // Debug only
      //  console.log('Today maximum temperature reading temperature : ', todayMaxTemperature[0].temperature);
      //  console.log('Today maximum temperature reading date : ', todayMaxTemperature[0].date);
      if (todayMaxTemperature[0] !== undefined) {
        io.emit(todayMaxTemperatureSocketName,
         {'temperature' : todayMaxTemperature[0].temperature, 'date': todayMaxTemperature[0].date});
       }
    }).catch(function (err) {
        console.log('Error while finding today maximum temperature : ', err);
    });
  });

  /**
   * Today average temperature reading scheduler
   */
   runScheduler(function() {
     temperatureController.getTodayAverageTemperature().then(function (todayAverageTemperature) {
       // Debug only
        console.log('Today average temperature reading temperature : ', todayAverageTemperature);
       if (todayAverageTemperature !== undefined) {
         io.emit(todayMaxTemperatureSocketName,
          {'temperature' : todayAverageTemperature});
        }
     }).catch(function (err) {
         console.log('Error while finding today average temperature : ', err);
     });
   });

// Server
app.listen(port, "0.0.0.0", function() {
  console.log('Express server listening on port ' + port);
});
