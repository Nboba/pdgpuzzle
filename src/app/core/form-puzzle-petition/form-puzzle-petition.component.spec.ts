import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPuzzlePetitionComponent } from './form-puzzle-petition.component';

describe('FormPuzzlePetitionComponent', () => {
  let component: FormPuzzlePetitionComponent;
  let fixture: ComponentFixture<FormPuzzlePetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPuzzlePetitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPuzzlePetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
