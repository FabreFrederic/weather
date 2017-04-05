import { TestBed, inject } from '@angular/core/testing';

import { TemperatureServiceService } from './temperature-service.service';

describe('TemperatureServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemperatureServiceService]
    });
  });

  it('should ...', inject([TemperatureServiceService], (service: TemperatureServiceService) => {
    expect(service).toBeTruthy();
  }));
});
