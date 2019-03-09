import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationuploadComponent } from './publicationupload.component';

describe('PublicationuploadComponent', () => {
  let component: PublicationuploadComponent;
  let fixture: ComponentFixture<PublicationuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
