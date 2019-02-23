import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleuploadComponent } from './peopleupload.component';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

describe('PeopleuploadComponent', () => {
  let component: PeopleuploadComponent;
  let fixture: ComponentFixture<PeopleuploadComponent>;

  const fb: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleuploadComponent ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AngularFirestore },
        { provide: AngularFireStorage },
        { provide: FormBuilder, useValue: fb }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
