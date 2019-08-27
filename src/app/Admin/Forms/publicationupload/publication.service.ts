import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, of } from 'rxjs';
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

  editSubmit(pub: Publication, type: string = "submit", key: string = ''){
    if(this.masterList){
      if(type === "submit"){
        return (this.CRUD.uploadItem(pub, 'publications'));
      }else if(type === "edit"){
        return this.CRUD.editItem(pub, 'publications', key);
      }
    }else{
      return Promise.resolve(undefined)
    }
  }

  delete(key:string){
    if(this.masterList){
      return this.CRUD.deleteItem([], 'publications', key);
    }else{

    }

  }

  fetchMaster(){
    this.masterList = true;
    this.subscription = this.CRUD.fetchAllData('publications')
                            .subscribe(pubs => this.publicationList.next(pubs));
  }

  assignMaster(pubs: Publication[]){
    this.publicationList.next(pubs);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
