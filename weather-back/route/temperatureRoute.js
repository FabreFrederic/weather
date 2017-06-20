'use strict';

module.exports = function(app) {
	var temperatureController = require('../controller/temperatureController');

	app.route('/temperature')
		.post(temperatureController.createTemperature);
};
