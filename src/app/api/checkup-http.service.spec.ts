import { TestBed } from '@angular/core/testing';

import { CheckupHttpService } from './checkup-http.service';

describe('CheckupHttpService', () => {
  let service: CheckupHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckupHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
