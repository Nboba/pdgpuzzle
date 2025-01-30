import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlePlayerComponent } from './puzzle-player.component';

describe('PuzzlePlayerComponent', () => {
  let component: PuzzlePlayerComponent;
  let fixture: ComponentFixture<PuzzlePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzlePlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzlePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
