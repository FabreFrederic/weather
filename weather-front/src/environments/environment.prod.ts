export const environment = {
  production: true,
  temperatureSocketUrl: 'ws://' + window.location.hostname + ':8085',
  temperatureRestUrl: 'http://' + window.location.hostname + ':8085',
  temperatureSocketName: 'temperature-message'
};
