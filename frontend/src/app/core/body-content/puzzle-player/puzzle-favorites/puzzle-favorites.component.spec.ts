import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleFavoritesComponent } from './puzzle-favorites.component';

describe('PuzzleFavoritesComponent', () => {
  let component: PuzzleFavoritesComponent;
  let fixture: ComponentFixture<PuzzleFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleFavoritesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
