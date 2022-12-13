import { TestBed } from '@angular/core/testing';

import { QueueHttpService } from './queue-http.service';

describe('QueueHttpService', () => {
  let service: QueueHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueueHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
