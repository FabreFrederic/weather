import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as io from 'socket.io-client';

import { environment } from 'environments/environment';
import { Temperature } from '../business/temperature';

const temperatureSocketUrl = environment.temperatureSocketUrl;
const temperatureRestUrl = environment.temperatureRestUrl;
const todayTemperatureSocketName = environment.todayTemperatureSocketName;
const todayMinTemperatureSocketName = environment.todayMinTemperatureSocketName;
const todayMaxTemperatureSocketName = environment.todayMaxTemperatureSocketName;
const todayAverageTemperatureSocketName = environment.todayAverageTemperatureSocketName;

@Injectable()
export class TemperatureService {
  private socket;

  constructor(public http: Http) {}

  /**
   * Get the today temperatures, from 00:00 am to now
   * @return {Observable<Temperature[]>}
   */
  public getTodayTemperatures(): Observable<Temperature[]> {
    return this.http
      .get(temperatureRestUrl + '/temperature/today')
      .map((response:Response) => {
        // console.log('getTodayTemperatures');
        const temperatures = response.json();
        return temperatures.map((temperature) => new Temperature(temperature)
        );
      })
      .catch(this.handleError);
  }

public getLastTodayTemperature(): Observable<Temperature> {
  return this.http
    .get(temperatureRestUrl + '/temperature/lasttodaytemperature')
    .map((response:Response) => {
      const temperature = response.json();
      console.log('getLastTodayTemperature : ' + temperature);
      return temperature.map((temperature) => new Temperature(temperature)
      );
    })
    .catch(this.handleError);
}

  public getLastTodayMinTemperature(): Observable<Temperature> {
    return this.http
      .get(temperatureRestUrl + '/temperature/lasttodaymintemperature')
      .map((response:Response) => {
        const temperature = response.json();
        console.log('getLastTodayMinTemperature : ' + temperature);
        return temperature.map((temperature) => new Temperature(temperature)
        );
      })
      .catch(this.handleError);
  }

  public getLastTodayMaxTemperature(): Observable<Temperature> {
    return this.http
      .get(temperatureRestUrl + '/temperature/lasttodaymaxtemperature')
      .map((response:Response) => {
        const temperature = response.json();
        console.log('getLastTodayMaxTemperature : ' + temperature);
        return temperature.map((temperature) => new Temperature(temperature)
        );
      })
      .catch(this.handleError);
  }

  public getLastTodayAverageTemperature(): Observable<Temperature> {
    return this.http
      .get(temperatureRestUrl + '/temperature/lasttodayaveragetemperature')
      .map((response:Response) => {
        const temperature = response.json();
        console.log('getLastTodayAverageTemperature : ' + temperature);
        return temperature;
      })
      .catch(this.handleError);
  }

  /**
   * Get the last temperature reading from a websocket
   * @return {Observable<Temperature>}
   */
  public getTemperature(): Observable<Temperature> {

    const observable = new Observable<Temperature>(observer => {
      this.socket = io.connect(temperatureSocketUrl,
        {
          'forceNew': true,
          'reconnection': false,
          'reconnectionDelay': 3000,
          'reconnectionDelayMax' : 5000,
          'reconnectionAttempts': 5
      });
      this.socket.on(todayTemperatureSocketName, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  /**
   * Get the today minimum temperature reading from a websocket
   * @return {Observable<Temperature>}
   */
  public getTodayMinTemperature(): Observable<Temperature> {

    const observable = new Observable<Temperature>(observer => {
      this.socket = io.connect(temperatureSocketUrl,
        {
          'forceNew': true,
          'reconnection': false,
          'reconnectionDelay': 3000,
          'reconnectionDelayMax' : 5000,
          'reconnectionAttempts': 5
      });
      this.socket.on(todayMinTemperatureSocketName, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  /**
   * Get the today maximum temperature reading from a websocket
   * @return {Observable<Temperature>}
   */
  public getTodayMaxTemperature(): Observable<Temperature> {

    const observable = new Observable<Temperature>(observer => {
      this.socket = io.connect(temperatureSocketUrl,
        {
          'forceNew': true,
          'reconnection': false,
          'reconnectionDelay': 3000,
          'reconnectionDelayMax' : 5000,
          'reconnectionAttempts': 5
      });
      this.socket.on(todayMaxTemperatureSocketName, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  /**
   * Get the today average temperature reading from a websocket
   * @return {Observable<Temperature>}
   */
  public getTodayAverageTemperature(): Observable<Temperature> {

    const observable = new Observable<Temperature>(observer => {
      this.socket = io.connect(temperatureSocketUrl,
        {
          'forceNew': true,
          'reconnection': false,
          'reconnectionDelay': 3000,
          'reconnectionDelayMax' : 5000,
          'reconnectionAttempts': 5
      });
      this.socket.on(todayAverageTemperatureSocketName, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  /**
   * Handle and throw error when a rest service is called
   * @param  {Response | any}         error [description]
   * @return {[type]}        [description]
   */
  private handleError (error: Response | any) {
    console.error('TemperatureService::handleError', error);
    return Observable.throw(error);
  }

}
