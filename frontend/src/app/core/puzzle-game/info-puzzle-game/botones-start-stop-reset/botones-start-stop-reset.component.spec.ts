import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesStartStopResetComponent } from './botones-start-stop-reset.component';

describe('BotonesStartStopResetComponent', () => {
  let component: BotonesStartStopResetComponent;
  let fixture: ComponentFixture<BotonesStartStopResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonesStartStopResetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonesStartStopResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
