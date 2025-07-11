import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleViewComponent } from './puzzle-view.component';

describe('PuzzleComponent', () => {
  let component: PuzzleViewComponent;
  let fixture: ComponentFixture<PuzzleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PuzzleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
