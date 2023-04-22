import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreUserDeatilsComponent } from './pre-user-deatils.component';

describe('PreUserDeatilsComponent', () => {
  let component: PreUserDeatilsComponent;
  let fixture: ComponentFixture<PreUserDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreUserDeatilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreUserDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
