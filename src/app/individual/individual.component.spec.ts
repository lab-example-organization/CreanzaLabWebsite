import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';

import { Person } from '../Classes/person';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { IndividualComponent } from './individual.component';

import { of } from 'rxjs';

describe('IndividualComponent', () => {
  let component: IndividualComponent;
  let fixture: ComponentFixture<IndividualComponent>;
  const activatedRoute = new ActivatedRouteStub();

  const expectedPerson: Person = {
    description: 'This is the description of a person.',
      endingYear: 'This is the ending year of a person.',
      name: 'This is the name of a person.',
      email: 'This is the email of a person.',
      publications: 'Publications',
      project: 'This is the project of a person.',
      projects: [
        {
          title: 'First project title',
          mainInfo: 'First project description',
        },
        {
          title: 'Second project title',
          mainInfo: 'Second project description',
        },
      ],
      cvresume: 'Link to a CV',
      awards: ['First award', 'Second Award'],
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

  beforeEach(() => {
    activatedRoute.setData(expectedPerson);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualComponent ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: AngularFireStorage },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
