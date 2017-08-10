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

const saveTodayMinTemperature = function() {
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

const getTodayMinTemperature = function() {
  var start = new Date();
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);

  return new Promise((resolve, reject) => {
    temperature.find( {'date' : { $gte: start, $lt: end } },
    (err, todayMinTemperature) => {
      if (err) {
        console.log('There was a problem finding today minimum temperature in MongoDB' + err);
        reject(err);
      } else {
        //console.log('Get today minimum temperature from MongoDB');
        resolve(todayMinTemperature);
      }
    }).sort( { 'temperature': 1 } ).limit(1);
  }
)};

const getTodayMaxTemperature = function() {
  var start = new Date();
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);

  return new Promise((resolve, reject) => {
    temperature.find( {'date' : { $gte: start, $lt: end } },
    (err, todayMaxTemperature) => {
      if (err) {
        console.log('There was a problem finding today maximum temperature in MongoDB' + err);
        reject(err);
      } else {
        //console.log('Get today maximum temperature from MongoDB');
        resolve(todayMaxTemperature);
      }
    }).sort( { 'temperature': -1 } ).limit(1);
  }
)};

const getTodayAverageTemperature = function() {
  var start = new Date();
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);

  return new Promise((resolve, reject) => {
    temperature.aggregate([
      {
        $match: {
          date: {
            $gte: start,
            $lt: end
          }
        }
      },
      {
        $group: {
          _id: null,
          averageTemperature: {
            $avg: "$temperature"
          }
        }
      }
    ],
    (err, average) => {
      if (err) {
        console.log('There was a problem finding today average temperature in MongoDB' + err);
        reject(err);
      } else if (average[0] === undefined || average[0].averageTemperature === undefined) {
        console.log('There was a problem finding today average temperature in MongoDB : no temperature');
        resolve(undefined);
      } else {
        // console.log('Get today average temperature from MongoDB: ',
        //   average[0].averageTemperature);
        resolve(Math.round(average[0].averageTemperature * 100) / 100);
      }
    });
  }
)};

module.exports = router;
module.exports.createTemperature = createTemperature;
module.exports.findTodayTemperatures = findTodayTemperatures;
module.exports.getTodayMinTemperature = getTodayMinTemperature;
module.exports.getTodayMaxTemperature = getTodayMaxTemperature;
module.exports.getTodayAverageTemperature = getTodayAverageTemperature;
