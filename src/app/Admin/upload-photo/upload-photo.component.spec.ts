import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPhotoComponent } from './upload-photo.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

describe('UploadPhotoComponent', () => {
  let component: UploadPhotoComponent;
  let fixture: ComponentFixture<UploadPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPhotoComponent ],
      imports: [
        MatListModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AngularFireStorage },
        { provide: AngularFirestore },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
