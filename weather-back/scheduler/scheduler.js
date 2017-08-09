var schedule = require('node-schedule');

var scheduler = function (job) {
  schedule.scheduleJob('*/10 * * * * *', job);
};

module.exports = scheduler
