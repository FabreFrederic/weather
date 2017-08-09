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
const lastTodayTemperatureSocketName = environment.lastTodayTemperatureSocketName;
const todayMinTemperatureSocketName = environment.todayMinTemperatureSocketName;
const todayMaxTemperatureSocketName = environment.todayMaxTemperatureSocketName;

@Injectable()
export class TemperatureService {
  private socket;

  constructor(public http: Http) {}

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
      this.socket.on(lastTodayTemperatureSocketName, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  /**
   * Get the today temperatures, from 00:00 am to now
   * @return {Observable<Temperature[]>}
   */
  public getTodayTemperatures(): Observable<Temperature[]> {
    return this.http
      .get(temperatureRestUrl + '/temperature/today')
      .map((response:Response) => {
        console.log('getTodayTemperatures', new Date());
        const temperatures = response.json();
        return temperatures.map((temperature) => new Temperature(temperature)
        );
      })
      .catch(this.handleError);
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
   * Handle and throw error when a rest service is called
   * @param  {Response | any}         error [description]
   * @return {[type]}        [description]
   */
  private handleError (error: Response | any) {
    console.error('TemperatureService::handleError', error);
    return Observable.throw(error);
  }

}
