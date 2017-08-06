var schedule = require('node-schedule');

var scheduler = function (job) {
  schedule.scheduleJob('5 * * * * * *', job);
};

module.exports = scheduler
