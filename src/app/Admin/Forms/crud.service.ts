import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/GlobalServices/firebase.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/Classes/user';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {


  constructor(private firebaseserv: FirebaseService) {
  }

  fetchIndivdualData(user: User, path: string) {
      return this.fetchAllData(path).pipe(
        map(members =>
          members.find(member =>
            member.email === user.email)
      ));
  }

  fetchAllData(path) {
    return this.firebaseserv.returnCollectionWithKeys(path);
  }
  

  quickAssign(Form: FormGroup, edit: any): FormGroup {
    Object.keys(Form.controls).forEach(key => {
      if (typeof(Form.controls[key].value) !== 'object') {
        if (edit[key] !== undefined) {
          Form.controls[key].patchValue(edit[key]);
        } else {
          Form.controls[key].patchValue('');
        }
      }});
    return Form;
  }

  uploadImages(paths: string[], images: any[]) {
    if (images[0]) {
      const links = new Array<string>(paths.length);

       // upload each image
      return Promise.all(images.map((event, index) => {
        return this.firebaseserv.uploadImage(paths[index], event)
        .then(() => {
          // return download link
          return this.firebaseserv.returnImage(paths[index]).toPromise();
        })
        .then(url => links[index] = url );

      }))
      .then(() => {
        // return all links
        return links;
      });
    } else {
      return Promise.resolve([undefined]);
    }
  }

  editImages(paths: string[], newImages: any[], oldImages: any[]) {
    const links = new Array<string>(paths.length);
    return Promise.all(newImages.map((event, index) => {

      if (!event) {
        // Change nothing!
        links[index] = oldImages[index];
      } else {
        // Delete old image and upload new image
        return this.removeOldImage(oldImages[index]) // delete old image
        .then(() => {
          // upload new image
          return this.firebaseserv.uploadImage(paths[index], event);
        })
        .then(() => {
          // return download link
          return this.firebaseserv.returnImage(paths[index]).toPromise();
        })
        .then(url => { links[index] = url; });
      }
    })).then(() => {
      // return all links
      return(links);
    });
  }

  private removeOldImage(link: string) {
    if (link) {
      return this.firebaseserv.deleteImage(link);
    } else {
      return Promise.resolve(undefined);
    }
  }

  uploadItem(newDoc: any, path: string) {
    return this.firebaseserv.uploadDocument(newDoc, path);
  }

  editItem(editDoc: any, path: string, docKey: string) {
    return this.firebaseserv.editDocument(editDoc, path, docKey);
  }

  deleteItem(StorageUrls: string[] = [], docPath: string, docKey: string) {
    return Promise.all(StorageUrls.map(pic => {
      return this.firebaseserv.deleteImage(pic);
    })).then(() => {
      this.firebaseserv.deleteDocument(docPath, docKey);
    });
  }

}
