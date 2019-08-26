import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpubnamesComponent } from './addpubnames.component';

describe('AddpubnamesComponent', () => {
  let component: AddpubnamesComponent;
  let fixture: ComponentFixture<AddpubnamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpubnamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpubnamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
