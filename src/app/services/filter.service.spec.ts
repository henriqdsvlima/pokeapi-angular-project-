/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FiltroService } from './filter.service';

describe('Service: Filter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltroService]
    });
  });

  it('should ...', inject([FiltroService], (service: FiltroService) => {
    expect(service).toBeTruthy();
  }));
});
