var schedule = require('node-schedule');

var scheduler = function (job) {
  schedule.scheduleJob('* * * * * * *', job);
};

module.exports = scheduler
