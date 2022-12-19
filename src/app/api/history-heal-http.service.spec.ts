import { TestBed } from '@angular/core/testing';

import { HistoryHealHttpService } from './history-heal-http.service';

describe('HistoryHealHttpService', () => {
  let service: HistoryHealHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryHealHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
