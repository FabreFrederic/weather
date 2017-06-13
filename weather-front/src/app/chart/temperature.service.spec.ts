import { TestBed, async, inject } from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpModule, XHRBackend, Http, Response, ResponseOptions, URLSearchParams} from '@angular/http';
import {PlatformLocation} from '@angular/common';

import {Observable} from 'rxjs/Observable';

import { Temperature } from '../business/temperature';
import { TemperatureService } from './temperature.service';

describe('TemperatureService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        TemperatureService,
        { provide: XHRBackend, useClass: MockBackend },
        PlatformLocation
      ]
    });
  });

  it('should ...', inject([TemperatureService], (service: TemperatureService) => {
    expect(service).toBeTruthy();
  }));

  it('can instantiate service when inject service',
    inject([TemperatureService], (service: TemperatureService) => {
      expect(service instanceof TemperatureService).toBe(true);
  }));

  describe('#getTodayTemperatures()', () => {

    it('should return an empty array by default', inject([TemperatureService],
      (service: TemperatureService) => {
      //expect(service.getTodayTemperatures()).toBeUndefined();
      expect(service.getTodayTemperatures()).not.toBeNull();
      expect(service.getTodayTemperatures()).not.toBeUndefined();
      console.log('---------------');
      console.log(service.getTodayTemperatures());
    }));
  });

});
