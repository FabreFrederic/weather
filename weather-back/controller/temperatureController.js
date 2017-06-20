'use strict';

var mongoose = require('mongoose');
var Temperature = require('../models/temperature');

exports.createTemperature = function(req, res) {
  var newTemperature = new Temperature();
  newTemperature.temperature = req.body.temperature;
  //newTemperature.date = req.body.date;
  console.log('newTemperature : ' + newTemperature);
  newTemperature.save(function(err, temperature) {
    if (err) {
      res.send(err);
    }
    res.json(temperature);
  });
};
