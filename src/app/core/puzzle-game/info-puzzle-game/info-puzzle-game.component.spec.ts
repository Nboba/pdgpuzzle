import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPuzzleGameComponent } from './info-puzzle-game.component';

describe('InfoPuzzleGameComponent', () => {
  let component: InfoPuzzleGameComponent;
  let fixture: ComponentFixture<InfoPuzzleGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPuzzleGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoPuzzleGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
