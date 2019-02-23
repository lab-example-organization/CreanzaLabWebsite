import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const input: string[] = ['sample_link', 'sample_link'];

  const data = of(input);

  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data)
  };

  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ NgxTwitterTimelineModule ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireStorage },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
