import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatListModule } from '@angular/material/list';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { of } from 'rxjs';

import { Publication } from '../Classes/publication';
import { PublicationsComponent } from './publications.component';

describe('PublicationsComponent', () => {
  let component: PublicationsComponent;
  let fixture: ComponentFixture<PublicationsComponent>;

  const input: Publication[][] = [[
    {
      authors: ['First Author', 'Second Author', 'N Creanza'],
      year: 2018,
      title: 'This is the title of the article.',
      journal: 'This is the journal of the article.',
      doi: 'This is a DOI for the article.',
      issue: 95,
      volume: 5,
      first_page: 100,
      last_page: 105,
      article_number: 342,
    },
    {
      authors: ['First Author', 'Second Author', 'N Creanza'],
      year: 2018,
      title: 'This is the title of the article.',
      journal: 'This is the journal of the article.',
      doi: 'This is a DOI for the article.',
      issue: 95,
      volume: 5,
      first_page: 100,
      last_page: 105,
      article_number: 342,
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
      declarations: [ PublicationsComponent ],
      imports: [ MatListModule ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireStorage },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
