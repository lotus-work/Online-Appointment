import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBookingComponent } from './profile-booking.component';

describe('ProfileBookingComponent', () => {
  let component: ProfileBookingComponent;
  let fixture: ComponentFixture<ProfileBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
