import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicationsComponent } from './edit-publications.component';

describe('EditPublicationsComponent', () => {
  let component: EditPublicationsComponent;
  let fixture: ComponentFixture<EditPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
