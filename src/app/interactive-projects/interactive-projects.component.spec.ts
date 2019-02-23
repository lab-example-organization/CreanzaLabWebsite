import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveProjectsComponent } from './interactive-projects.component';

describe('InteractiveProjectsComponent', () => {
  let component: InteractiveProjectsComponent;
  let fixture: ComponentFixture<InteractiveProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
