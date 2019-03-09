import { TestBed } from '@angular/core/testing';

import { ResearchService } from './research.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

describe('ResearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore },
      { provide: AngularFireStorage },
    ],
  }));

  it('should be created', () => {
    const service: ResearchService = TestBed.get(ResearchService);
    expect(service).toBeTruthy();
  });
});
