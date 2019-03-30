import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemeberComponent } from './new-memeber.component';

describe('NewMemeberComponent', () => {
  let component: NewMemeberComponent;
  let fixture: ComponentFixture<NewMemeberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMemeberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMemeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
