'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var temperature = require('../models/temperature');

router.use(bodyParser.urlencoded({ extended: true }));

// creates a new temperature
router.post('/', function (req, res) {
  createTemperature(req.body.temperature).then(function (result) {
      res.status(200).send(result);
  }).catch(function (err) {
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

const findTodayTemperatures = function() {
  var now = new Date();
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return new Promise((resolve, reject) => {
    temperature.find({
        date : new Date()
    },
    (err, temperatures) => {
      if (err) {
        console.log("There was a problem finding today temperature in the database : " + err);
        reject(err);
      } else {
        resolve(newTemperature);
      }
    });
  }
  )};

module.exports = router;
module.exports.method = createTemperature;
module.exports.method = findTodayTemperatures;
