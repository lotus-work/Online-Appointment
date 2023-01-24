import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleCalendarIntregrationComponent } from './google-calendar-intregration.component';

describe('GoogleCalendarIntregrationComponent', () => {
  let component: GoogleCalendarIntregrationComponent;
  let fixture: ComponentFixture<GoogleCalendarIntregrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleCalendarIntregrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleCalendarIntregrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
