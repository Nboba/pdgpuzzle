import { TestBed } from '@angular/core/testing';

import { InfoPuzzleGameService } from '../info-puzzle-game.service';

describe('InfoPuzzleGameService', () => {
  let service: InfoPuzzleGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoPuzzleGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
