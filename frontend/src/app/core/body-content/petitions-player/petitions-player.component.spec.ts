import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionsPlayerComponent } from './petitions-player.component';

describe('PetitionsPlayerComponent', () => {
  let component: PetitionsPlayerComponent;
  let fixture: ComponentFixture<PetitionsPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetitionsPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetitionsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
