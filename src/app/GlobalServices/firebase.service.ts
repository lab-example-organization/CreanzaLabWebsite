import { Injectable } from '@angular/core';
import { AngularFirestore }       from '@angular/fire/firestore';
import { AngularFireStorage }     from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage: AngularFireStorage,
              private database: AngularFirestore) { }

  returnImage(url:string): Observable<string>{
    return this.storage.ref(url).getDownloadURL();
  }

  returnDocument(path:string): Observable<any> {
    return this.database.doc<any>(path).valueChanges();
  }
  
  returnCollect(path:string): Observable<any[]>{
    return(this.database.collection<any[]>(path).valueChanges());
  }

}
