import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAddPcComponent } from './post-add-pc.component';

describe('PostAddPcComponent', () => {
  let component: PostAddPcComponent;
  let fixture: ComponentFixture<PostAddPcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAddPcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAddPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
