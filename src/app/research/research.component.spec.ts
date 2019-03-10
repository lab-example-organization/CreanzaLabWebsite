import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchComponent } from './research.component';
import { GridComponent } from '../GridBlowUp/grid/grid.component';
import { BlowUpComponent } from '../GridBlowUp/blow-up/blow-up.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('ResearchComponent', () => {
  let component: ResearchComponent;
  let fixture: ComponentFixture<ResearchComponent>;

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
        ResearchComponent,
        GridComponent,
        BlowUpComponent,
      ],
      providers: [
        { provide: Router },
        { provide: Location },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireStorage },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
