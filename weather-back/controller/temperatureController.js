'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var temperature = require('../models/temperature');

router.use(bodyParser.urlencoded({ extended: true }));

// creates a new temperature
router.post('/', function (req, res) {
  var result = createTemperature(req.body.temperature);
  if (typeof result !== 'undefined') {
    res.status(200).send(result);
  } else {
    return res.status(500).send('There was a problem adding the information to the database');
  }
});

var createTemperature = function(temperatureValue) {
  temperature.create({
          temperature : temperatureValue,
          date : new Date()
      },
      function (err, newTemperature) {
        if (err) {
          console.log("There was a problem adding the information to the database : " + err);
        } else if (typeof newTemperature !== 'undefined') {
          return newTemperature;
        }
      });
}

module.exports = router;
module.exports.method = createTemperature;
