import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleMetadataComponent } from './puzzle-metadata.component';

describe('PuzzleMetadataComponent', () => {
  let component: PuzzleMetadataComponent;
  let fixture: ComponentFixture<PuzzleMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuzzleMetadataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
