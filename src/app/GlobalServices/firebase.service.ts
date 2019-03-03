import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private storage: AngularFireStorage,
              private database: AngularFirestore) { }

  returnImage(url: string): Observable<string> {
    return this.storage.ref(url).getDownloadURL();
  }

  returnDocument(path: string): Observable<any> {
    return this.database.doc<any>(path).valueChanges();
  }

  returnCollect(path: string): Observable<any[]> {
    return(this.database.collection<any[]>(path).valueChanges());
  }


  uploadDocument(newDoc: any, path: string) {
    return this.database.collection<any>(path).add(newDoc);
  }

  uploadImage(filePath: string, event: any) {
    const task = this.storage.upload(filePath, event.target.files[0]);
    return task.snapshotChanges().pipe(finalize(() => {})).toPromise();
  }

  returnCollectionWithKeys(path: string) {
    return this.database.collection<any>(path)
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
        const data = a.payload.doc.data() as any;
        data.key = a.payload.doc.id;
        return data;
      });
    }));
   }

   editDocument(newDoc: any, path: string, key: string) {
    return this.database.collection(path).doc(key).set(newDoc);
  }

  deleteDocument(path: string, key: string) {
    return this.database.collection(path).doc(key).delete();
  }

  deleteImage(url: string) {
    return this.storage.storage.refFromURL(url).delete();
  }
}
