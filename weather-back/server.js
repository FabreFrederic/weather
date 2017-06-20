const morgan = require('morgan');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')( http );
const path = require('path');
const bodyParser = require('body-parser');

const mongoose   = require('mongoose');
const database = require('./config/database')
const Temperature = require('./models/temperature');

// Log the requests using morgan
app.use(morgan(morgan('dev')));

// const serialport = require('./sensor/serialPort');

// Get port from environment and store in Express.
const port = process.env.PORT || '8085';
const frontBuildFolderPath = '../weather-front/build/';

mongoose.connect(database.remoteUrl);

// Point static path to the front build folder
app.use(express.static(path.join(__dirname, frontBuildFolderPath)));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var router = express.Router();
//// middleware to use for all requests
// router.use((req, res, next) => {
//     console.log('Something is happening.');
//     // make sure we go to the next routes and don't stop here
//     next();
// });

var routes = require('./route/temperatureRoute');
routes(app);

// let temperature = new Object();

// io.on('connection', function(socket) {
//   console.log('user connection');
//
//   serialport.on('data', function(data) {
//     temperature.temperature = Number(data);
//     temperature.date = new Date();
//     // console.log(temperature);
//     io.emit('temperature-message', temperature);
//   });
//
//   serialport.on('close', function(err) {
//     console.log('serial port closed', err);
//   });
// });
//
// io.on('disconnect', function(socket) {
//   console.log('user disconnected');
//   serialport.close();
// });

app.listen(port);
// http.listen(port, "0.0.0.0");
