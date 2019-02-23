import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

import { Person } from '../Classes/person';
import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  const input: Person[][] = [[
    {
      description: 'This is the description of a person.',
      endingYear: 'This is the ending year of a person.',
      name: 'This is the name of a person.',
      project: 'This is the project of a person.',
      startYear: 2017,
      studying: 'This is the studying of a person.',
      pronouns: 'These are the pronouns of a person',
      portraitLink: 'This is the portrait link of a person.'
    },
    {
      description: 'This is the description of a person.',
      endingYear: 'This is the ending year of a person.',
      name: 'This is the name of a person.',
      project: 'This is the project of a person.',
      startYear: 2017,
      studying: 'This is the studying of a person.',
      pronouns: 'These are the pronouns of a person',
      portraitLink: 'This is the portrait link of a person.'
    },
  ]];

  const data = of(input);

  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
  };

  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleComponent ],
      imports: [ MatCardModule ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireStorage },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
