import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationLoginFbComponent } from './registration-login-fb.component';

describe('RegistrationLoginFbComponent', () => {
  let component: RegistrationLoginFbComponent;
  let fixture: ComponentFixture<RegistrationLoginFbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationLoginFbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationLoginFbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
