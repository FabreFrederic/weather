// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  temperatureSocketUrl: 'ws://' + window.location.hostname + ':8086',
  temperatureRestUrl: 'http://' + window.location.hostname + ':8085',
  todayTemperatureSocketName: 'today-temperature-message',
  todayMinTemperatureSocketName: 'today-min-temperature-message',
  todayMaxTemperatureSocketName: 'today-max-temperature-message',
  todayAverageTemperatureSocketName: 'today-average-temperature-message',
  lastTodayTemperatureRestUrl: 'lasttodaytemperature',
  lastTodayAverageTemperatureRestUrl: 'lasttodayaveragetemperature',
  lastTodayMinTemperatureRestUrl: 'lasttodaymintemperature',
  lastTodayMaxTemperatureRestUrl: 'lasttodaymaxtemperature'
};
