import { TestBed } from '@angular/core/testing';

import { CRUDService } from './crud.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('CRUDService', () => {
  const data = of({});

  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
  };

  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: angularFirestoreStub },
      { provide: AngularFireStorage },
    ]
  }));

  it('should be created', () => {
    const service: CRUDService = TestBed.get(CRUDService);
    expect(service).toBeTruthy();
  });
});
