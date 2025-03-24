import { TestBed } from '@angular/core/testing';

import { MechanicPuzzleService } from '../mechanic-puzzle.service';

describe('MechanicPuzzleService', () => {
  let service: MechanicPuzzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MechanicPuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
