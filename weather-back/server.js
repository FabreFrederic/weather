const morgan = require('morgan');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')( http );
const runScheduler = require('./schedule/scheduler');
const path = require('path');
const bodyParser = require('body-parser');

const frontBuildFolderPath = '../weather-front/build/';

// Log the requests using morgan
app.use(morgan('dev'));

// Point static path to the front build folder
app.use(express.static(path.join(__dirname, frontBuildFolderPath)));
app.use(bodyParser.json());

temperature = new Object();

io.on('connection', function(socket) {
  console.log('user connection');
  runScheduler(function() {
    temperature.temperature = Math.floor(Math.random() * 10)
    temperature.date = new Date();
    io.emit('temperature-message', temperature);
  });
});

io.on('disconnect', function(socket) {
  console.log('user disconnected');
});

// Get port from environment and store in Express.
const port = process.env.PORT || '8085';
http.listen(port, "localhost");
