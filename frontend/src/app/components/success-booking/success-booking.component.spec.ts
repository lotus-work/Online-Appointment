import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessBookingComponent } from './success-booking.component';

describe('SuccessBookingComponent', () => {
  let component: SuccessBookingComponent;
  let fixture: ComponentFixture<SuccessBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
