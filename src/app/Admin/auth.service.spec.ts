import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

const angularFireAuthStub = {
  authState: new BehaviorSubject({}),
  auth: {
      signInWithPopup: jasmine.createSpy('signInWithPopup')
  },
};

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore },
      { provide: AngularFireAuth, useValue: angularFireAuthStub },
      { provide: Router },
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
