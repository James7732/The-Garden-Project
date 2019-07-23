import { TestBed } from '@angular/core/testing';

import { GardenServiceService } from './garden-service.service';

describe('GardenServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GardenServiceService = TestBed.get(GardenServiceService);
    expect(service).toBeTruthy();
  });
});
