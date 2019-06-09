import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMembersComponent } from './edit-members.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

describe('EditMembersComponent', () => {
  let component: EditMembersComponent;
  let fixture: ComponentFixture<EditMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMembersComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AngularFirestore },
        { provide: AngularFireStorage },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
