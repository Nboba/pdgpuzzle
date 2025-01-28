import { TestBed } from '@angular/core/testing';

import { PetitionPuzzleService } from './petition-puzzle.service';

describe('PetitionPuzzleService', () => {
  let service: PetitionPuzzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetitionPuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
