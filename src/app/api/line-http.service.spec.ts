import { TestBed } from '@angular/core/testing';

import { LineHttpService } from './line-http.service';

describe('LineHttpService', () => {
  let service: LineHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
