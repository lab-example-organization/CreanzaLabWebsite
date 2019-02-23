import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { of } from 'rxjs';

describe('HomeService', () => {
  const input: string[] = ['sample_link', 'sample_link'];

  const data = of(input);

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
    const service: HomeService = TestBed.get(HomeService);
    expect(service).toBeTruthy();
  });
});
