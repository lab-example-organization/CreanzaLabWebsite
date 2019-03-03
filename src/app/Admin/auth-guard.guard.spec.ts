import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
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

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AngularFirestore },
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: Router },
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
