import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetPasswordMailComponent } from './send-reset-password-mail.component';

describe('SendResetPasswordMailComponent', () => {
  let component: SendResetPasswordMailComponent;
  let fixture: ComponentFixture<SendResetPasswordMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendResetPasswordMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendResetPasswordMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
