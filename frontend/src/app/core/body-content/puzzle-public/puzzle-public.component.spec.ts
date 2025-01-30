import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzlePublicComponent } from './puzzle-public.component';

describe('PuzzlePublicComponent', () => {
  let component: PuzzlePublicComponent;
  let fixture: ComponentFixture<PuzzlePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzlePublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzlePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
