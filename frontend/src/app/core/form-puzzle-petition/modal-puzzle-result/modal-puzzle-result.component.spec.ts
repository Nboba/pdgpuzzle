import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPuzzleResultComponent } from './modal-puzzle-result.component';

describe('ModalPuzzleResultComponent', () => {
  let component: ModalPuzzleResultComponent;
  let fixture: ComponentFixture<ModalPuzzleResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPuzzleResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPuzzleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
