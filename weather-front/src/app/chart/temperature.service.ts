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
const temperatureSocketName = environment.temperatureSocketName;

@Injectable()
export class TemperatureService {
  private socket;

  constructor(public http: Http) {}

  /**
   * [getTemperature description]
   * @return {Observable<Temperature>}
   */
  public getTemperature(): Observable<Temperature> {
    const observable = new Observable<Temperature>(observer => {
      this.socket = io(temperatureSocketUrl);
      this.socket.on(temperatureSocketName, (data) => {
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
      .get(temperatureRestUrl + '/temperatures/today')
      .map(response => {
        const temperatures = response.json();
        return temperatures.map((temperature) => new Temperature(temperature)
        );
      })
      .catch(this.handleError);
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
