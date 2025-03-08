import { TestBed } from '@angular/core/testing';

import { PuzzleApiService } from './puzzle-api.service';

describe('PuzzleService', () => {
  let service: PuzzleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
