import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardComponent } from './edit-card.component';
import { PeopleuploadComponent } from '../Forms/peopleupload/peopleupload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { of, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

const angularFireAuthStub = {
  authState: new BehaviorSubject({}),
  auth: {
      signInWithPopup: jasmine.createSpy('signInWithPopup')
  },
};

describe('EditCardComponent', () => {
  let component: EditCardComponent;
  let fixture: ComponentFixture<EditCardComponent>;

  const data = of({});

  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
  };

  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditCardComponent,
        PeopleuploadComponent
      ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFireStorage },
        { provide: Router },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
