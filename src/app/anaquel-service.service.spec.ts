import { TestBed } from '@angular/core/testing';

import { AnaquelServiceService } from './anaquel-service.service';

describe('AnaquelServiceService', () => {
  let service: AnaquelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnaquelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
