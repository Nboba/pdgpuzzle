import { TestBed } from '@angular/core/testing';

import { PuzzleGameService } from './puzzle-game.service';

describe('PuzzleGameService', () => {
  let service: PuzzleGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
