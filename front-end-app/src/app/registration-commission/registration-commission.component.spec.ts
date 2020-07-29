import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCommissionComponent } from './registration-commission.component';

describe('RegistrationCommissionComponent', () => {
  let component: RegistrationCommissionComponent;
  let fixture: ComponentFixture<RegistrationCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
