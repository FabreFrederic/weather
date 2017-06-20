'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemperatureSchema = new Schema({
    temperature: { type: Number },
    date: { type: Date }
});

module.exports = mongoose.model('Temperature', TemperatureSchema);
