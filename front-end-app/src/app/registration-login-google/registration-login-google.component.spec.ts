import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationLoginGoogleComponent } from './registration-login-google.component';

describe('RegistrationLoginGoogleComponent', () => {
  let component: RegistrationLoginGoogleComponent;
  let fixture: ComponentFixture<RegistrationLoginGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationLoginGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationLoginGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
