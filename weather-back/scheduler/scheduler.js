var schedule = require('node-schedule');

var scheduler = function (job) {
  schedule.scheduleJob('*/30 * * * * *', job);
};

module.exports = scheduler
