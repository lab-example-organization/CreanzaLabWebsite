import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicationsComponent } from './edit-publications.component';
import { PublicationuploadComponent } from '../Forms/publicationupload/publicationupload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

describe('EditPublicationsComponent', () => {
  let component: EditPublicationsComponent;
  let fixture: ComponentFixture<EditPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditPublicationsComponent,
        PublicationuploadComponent,
      ],
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
    fixture = TestBed.createComponent(EditPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
