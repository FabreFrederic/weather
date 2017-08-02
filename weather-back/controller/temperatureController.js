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
      res.status(500).send('There was a problem adding the information to the database');
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
          console.log("There was a problem adding the information to the database : " + err);
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
      res.status(500).send('There was a problem retrieving the today temperatures from database');
  });
});

const findTodayTemperatures = function() {
  // var now = new Date();
  // var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  var start = new Date();
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);

// db.posts.find({'date': {$gte: start, $lt: end}});

  return new Promise((resolve, reject) => {
    temperature.find({'date' : {$gte: start, $lt: end}},
    (err, temperatures) => {
      if (err) {
        console.log('There was a problem finding today temperature in the database : ' + err);
        reject(err);
      } else {
        console.log('Todat temperatures from db : ', temperatures);
        resolve(temperatures);
      }
    });
  }
)};

module.exports = router;
module.exports.createTemperature = createTemperature;
module.exports.findTodayTemperatures = findTodayTemperatures;
