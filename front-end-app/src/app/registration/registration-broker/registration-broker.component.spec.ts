import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationBrokerComponent } from './registration-broker.component';

describe('RegistrationBrokerComponent', () => {
  let component: RegistrationBrokerComponent;
  let fixture: ComponentFixture<RegistrationBrokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationBrokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
