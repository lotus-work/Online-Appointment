import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventTypeComponent } from './edit-event-type.component';

describe('EditEventTypeComponent', () => {
  let component: EditEventTypeComponent;
  let fixture: ComponentFixture<EditEventTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
