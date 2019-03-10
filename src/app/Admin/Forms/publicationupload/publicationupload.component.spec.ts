import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { PublicationuploadComponent } from './publicationupload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PublicationuploadComponent', () => {
  let component: PublicationuploadComponent;
  let fixture: ComponentFixture<PublicationuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationuploadComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AngularFirestore },
        { provide: AngularFireStorage },
      ],
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
