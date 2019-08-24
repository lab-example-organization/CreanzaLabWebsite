import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewfeedComponent } from './edit-newfeed.component';

describe('EditNewfeedComponent', () => {
  let component: EditNewfeedComponent;
  let fixture: ComponentFixture<EditNewfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNewfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
