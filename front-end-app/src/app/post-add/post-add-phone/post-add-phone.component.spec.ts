import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAddPhoneComponent } from './post-add-phone.component';

describe('PostAddPhoneComponent', () => {
  let component: PostAddPhoneComponent;
  let fixture: ComponentFixture<PostAddPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAddPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAddPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
