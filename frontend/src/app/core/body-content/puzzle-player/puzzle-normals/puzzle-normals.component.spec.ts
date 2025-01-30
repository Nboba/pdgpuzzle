import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleNormalsComponent } from './puzzle-normals.component';

describe('PuzzleNormalsComponent', () => {
  let component: PuzzleNormalsComponent;
  let fixture: ComponentFixture<PuzzleNormalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleNormalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleNormalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
