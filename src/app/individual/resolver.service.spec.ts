import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { Person } from '../Classes/person';
import { ResolverService } from './resolver.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

import { of } from 'rxjs';

describe('ResolverService', () => {
  const expectedPerson: Person = {
    description: 'This is the description of a person.',
    endingYear: 'This is the ending year of a person.',
    name: 'Joey',
    project: 'This is the project of a person.',
    startYear: 2017,
    studying: 'This is the studying of a person.',
    pronouns: 'These are the pronouns of a person',
    portraitLink: 'This is the portrait link of a person.'
  };

  const data = of(expectedPerson);

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
      { provide: Router },
    ]
  }));

  it('should be created', () => {
    const service: ResolverService = TestBed.get(ResolverService);
    expect(service).toBeTruthy();
  });
});