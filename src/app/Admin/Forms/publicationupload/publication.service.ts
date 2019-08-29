import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Publication } from 'src/app/Classes/publication';
import { CRUDService } from '../crud.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService implements OnDestroy{

  publicationList = new BehaviorSubject<Publication[]>([]);
  masterList: boolean;
  subscription: Subscription;

  constructor(private CRUD: CRUDService) { }

  PickRoute(bool: boolean){
    this.masterList = bool;
  }

  editSubmit(newPub: Publication, submit: boolean, key: string = ''){
    if(this.masterList){
      if(submit){
        return (this.CRUD.uploadItem(newPub, 'publications'));
      }else{
        return this.CRUD.editItem(newPub, 'publications', key);
      }
    }else{
      let pubList = this.publicationList.value;
      if(submit){
        pubList.push(newPub);
      }else{
            const index = pubList.findIndex(pub => pub.title === newPub.title);
            pubList.splice(index, 1);
            pubList.push(newPub);
      }
      this.publicationList.next(pubList);
      return Promise.resolve(undefined)
    }
  }

  delete(key: string = "no key", delPub: any = "no pub"){
    if(this.masterList){
      return this.CRUD.deleteItem([], 'publications', key);
    }else{
      let pubList = this.publicationList.value;
      const index = pubList.findIndex(pub => pub.title === delPub.title);
      pubList.splice(index, 1);
      this.publicationList.next(pubList);
      return Promise.resolve(undefined)
    }
  }

  fetchMaster(){
    this.masterList = true;
    this.subscription = this.CRUD.fetchAllData('publications')
                            .subscribe(pubs => this.publicationList.next(pubs));
  }

  assignMaster(pubs: Publication[]){
    this.masterList = false;
    this.publicationList.next(pubs);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
