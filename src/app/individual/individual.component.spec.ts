import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';

import { Person } from '../Classes/person';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { IndividualComponent } from './individual.component';

import { of } from 'rxjs';
import { SocialMedia } from '../Classes/socialMedia';


describe('IndividualComponent', () => {
  let component: IndividualComponent;
  let fixture: ComponentFixture<IndividualComponent>;
  const activatedRoute = new ActivatedRouteStub();

  const expectedPerson: Person = {
    pubName: 'this is your pub name',
    description: 'This is the description of a person.',
    endingYear: 'This is the ending year of a person.',
    name: 'This is the name of a person.',
    email: 'This is the email of a person.',
    publications: 'Publications',
    projectShort: 'This is the project of a person.',
    projects: "lol",
    cvresume: 'Link to a CV',
    awards: 'First award',
    startYear: '2017',
    studying: 'This is the studying of a person.',
    pronouns: 'These are the pronouns of a person',
    portraitLink: 'This is the portrait link of a person.',
    socialMedia: 'This is the social media for a person.',
  };

  const expectedSocialMedia: SocialMedia = {
    Personal: 'lol oh lol',
    Android: 'This is where a person may put their android account.',
    Dribbble: 'This is where a person may put their dribbble account.',
    Facebook: 'This is where a person may put their facebook account.',
    Flickr: 'This is where a person may put their flickr account.',
    FourSquare: 'This is where a person may put their foursquare account.',
    Google: 'This is where a person may put their google account.',
    Instagram: 'This is where a person may put their instagram account.',
    LinkedIn: 'This is where a person may put their linkedin account.',
    Pinterest: 'This is where a person may put their pinterest account.',
    Reddit: 'This is where a person may put their reddit account.',
    RSS: 'This is where a person may put their rss account.',
    Skype: 'This is where a person may put their skype account.',
    Snapchat: 'This is where a person may put their snapchat account.',
    SoundCloud: 'This is where a person may put their soundcloud account.',
    StumbleUpon: 'This is where a person may put their stumbleupon account.',
    Tumblr: 'This is where a person may put their tumblr account.',
    Twitter: 'This is where a person may put their twitter account.',
    Vimeo: 'This is where a person may put their vimeo account.',
    Vine: 'This is where a person may put their vine account.',
    Yahoo: 'This is where a person may put their yahoo account.',
    Youtube: 'This is where a person may put their youtube account.',
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
