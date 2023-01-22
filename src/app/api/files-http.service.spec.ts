import { TestBed } from '@angular/core/testing';

import { FilesHttpService } from './files-http.service';

describe('FilesHttpService', () => {
  let service: FilesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
