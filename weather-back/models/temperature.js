'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weather');
var Schema = mongoose.Schema;

var TemperatureSchema = new Schema({
    temperature: { type: Number },
    date: { type: Date }
});

module.exports = mongoose.model('Temperature', TemperatureSchema);
