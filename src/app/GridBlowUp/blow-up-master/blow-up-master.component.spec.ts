import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlowUpMasterComponent } from './blow-up-master.component';

describe('BlowUpMasterComponent', () => {
  let component: BlowUpMasterComponent;
  let fixture: ComponentFixture<BlowUpMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlowUpMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlowUpMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
