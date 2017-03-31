// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const runScheduler = require('./schedule/scheduler');

// Get our API routes
const api = require('./route/api');
const app = express();

const frontBuildFolderPath = '../weather-front/build/';

// Point static path to the front build folder
app.use(express.static(path.join(__dirname, frontBuildFolderPath)));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, frontBuildFolderPath + 'index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

runScheduler(function() {
  console.log("bonjour");
});
