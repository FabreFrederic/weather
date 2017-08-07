'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var temperature = require('../models/temperature');

router.use(bodyParser.urlencoded({ extended: true }));

// creates a new temperature
router.post('/', (req, res) => {
  createTemperature(req.body.temperature).then(function (result) {
      res.status(200).send(result);
  }).catch((err) => {
      res.status(500).send('There was a problem adding the information to MongoDB');
  });
});

const createTemperature = function(temperatureValue) {
    return new Promise((resolve, reject) => {
      temperature.create({
          temperature : temperatureValue,
          date : new Date()
      },
      (err, newTemperature) => {
        if (err) {
          console.log("There was a problem adding the information to MongoDB : " + err);
          reject(err);
        } else {
          resolve(newTemperature);
        }
      });
    }
)};

// Returns all the today temperatures
router.get('/today', (req, res) => {
  findTodayTemperatures(req.body.temperature).then(function (result) {
      res.status(200).send(result);
  }).catch((err) => {
      res.status(500).send('There was a problem retrieving the today temperatures from MongoDB');
  });
});

const findTodayTemperatures = function() {
  var start = new Date();
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);

  return new Promise((resolve, reject) => {
    temperature.find( {'date' : { $gte: start, $lt: end } },
    (err, temperatures) => {
      if (err) {
        console.log('There was a problem finding today temperature in MongoDB' + err);
        reject(err);
      } else {
        console.log('Get today temperatures from MongoDB');
        resolve(temperatures);
      }
    }).sort( { 'date': 1 } );
  }
)};

const saveMaxTemperature = function() {
  return new Promise((resolve, reject) => {
    temperature.create({
        maxTemperature : temperatureValue,
        date : new Date()
    },
    (err, newTemperature) => {
      if (err) {
        console.log("There was a problem adding the information to MongoDB : " + err);
        reject(err);
      } else {
        resolve(newTemperature);
      }
    });
  }
)};

const getTodayMaxTemperature = function() {
  var start = new Date();
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);

  return new Promise((resolve, reject) => {
    temperature.find( {'date' : { $gte: start, $lt: end } },
    (err, temperatures) => {
      if (err) {
        console.log('There was a problem finding today temperature in MongoDB' + err);
        reject(err);
      } else {
        console.log('Get today temperatures from MongoDB');
        resolve(temperatures);
      }
    }).sort( { 'date': 1 } );
  }
)};


module.exports = router;
module.exports.createTemperature = createTemperature;
module.exports.findTodayTemperatures = findTodayTemperatures;
