import { TestBed } from '@angular/core/testing';

import { PuzzleLocalService } from './puzzle-local.service';

describe('PuzzlePetitionService', () => {
  let service: PuzzleLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
