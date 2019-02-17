import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleuploadComponent } from './peopleupload.component';

describe('PeopleuploadComponent', () => {
  let component: PeopleuploadComponent;
  let fixture: ComponentFixture<PeopleuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
