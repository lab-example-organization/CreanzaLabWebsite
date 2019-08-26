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

  Action(pubs: Publication, type="submit"){
    if(this.masterList){
      if(type === "submit"){
        return (this.CRUD.uploadItem(pubs, 'publications'));
      }
    }else{

    }
  }

  fetchMaster(){
    this.masterList = true;
    this.subscription = this.CRUD.fetchAllData('publications')
                            .subscribe(pubs => this.publicationList.next(pubs));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
