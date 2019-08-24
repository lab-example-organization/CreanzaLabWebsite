import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewNewsEventComponent } from './add-new-news-event.component';

describe('AddNewNewsEventComponent', () => {
  let component: AddNewNewsEventComponent;
  let fixture: ComponentFixture<AddNewNewsEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewNewsEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewNewsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
