export const environment = {
  production: true,
  temperatureSocketUrl: 'ws://' + window.location.hostname + ':8085',
  temperatureRestUrl: 'http://' + window.location.hostname + ':8085',
  lastTodayTemperatureSocketName: 'last-today-temperature-message',
  todayMinTemperatureSocketName: 'today-min-temperature-message',
  todayMaxTemperatureSocketName: 'today-max-temperature-message',
  todayAverageTemperatureSocketName: 'today-average-temperature-message'
};
