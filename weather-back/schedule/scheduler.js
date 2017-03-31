var schedule = require('node-schedule');

var scheduler = function (job) {
  schedule.scheduleJob('*/1 * * * * *', job);
};

module.exports = scheduler
