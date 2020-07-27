import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToStartArrowComponent } from './to-start-arrow.component';

describe('ToStartArrowComponent', () => {
  let component: ToStartArrowComponent;
  let fixture: ComponentFixture<ToStartArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToStartArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToStartArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
