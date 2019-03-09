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
    description: 'This is the description of a person.',

    endingYear: 'This is the ending year of a person.',
    name: 'Joey',
    project: 'This is the project of a person.',
    startYear: 2017,
    studying: 'This is the studying of a person.',
    pronouns: 'These are the pronouns of a person.',
    portraitLink: 'This is the portrait link of a person.',
    socialMedia: 'This is the social media for a person.',
  };

  const expectedSocialMedia: SocialMedia = {
    android: 'This is where a person may put their android account.',
    dribbble: 'This is where a person may put their dribbble account.',
    facebook: 'This is where a person may put their facebook account.',
    flickr: 'This is where a person may put their flickr account.',
    foursquare: 'This is where a person may put their foursquare account.',
    google: 'This is where a person may put their google account.',
    instagram: 'This is where a person may put their instagram account.',
    linkedin: 'This is where a person may put their linkedin account.',
    pinterest: 'This is where a person may put their pinterest account.',
    reddit: 'This is where a person may put their reddit account.',
    rss: 'This is where a person may put their rss account.',
    skype: 'This is where a person may put their skype account.',
    snapchat: 'This is where a person may put their snapchat account.',
    soundcloud: 'This is where a person may put their soundcloud account.',
    stumbleupon: 'This is where a person may put their stumbleupon account.',
    tumblr: 'This is where a person may put their tumblr account.',
    twitter: 'This is where a person may put their twitter account.',
    vimeo: 'This is where a person may put their vimeo account.',
    vine: 'This is where a person may put their vine account.',
    yahoo: 'This is where a person may put their yahoo account.',
    youtube: 'This is where a person may put their youtube account.',
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
