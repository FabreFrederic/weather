var Temperature = require('./models/temperature');

module.exports = function (app) {
    // Create temperature in mongodb
    app.post('/api/temperature', function (req, res) {
        Temperature.create({
            temperature = req.body.temperature,
            date = req.body.date
        }, function (err, todo) {
            if (err) {
                res.send(err);
            }
            console.log('Save temperature : ', temperature);
        });
    });
};
