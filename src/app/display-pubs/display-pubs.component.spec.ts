import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPubsComponent } from './display-pubs.component';

describe('DisplayPubsComponent', () => {
  let component: DisplayPubsComponent;
  let fixture: ComponentFixture<DisplayPubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
