import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export interface Temperature {
  temperature: number;
	date: Date;
}

@Injectable()
export class TemperatureService {
  private  url = 'ws://localhost:8085';
  private socket;

  getTemperature(): Observable<Temperature> {
    console.log('getTemperature');
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('temperature-message', (data) => {
        // console.log('data', data);
        observer.next(data);
      });
    });
    return observable;
  }
}
