import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridBlowUpService {
  index = new BehaviorSubject<number>(0);
  visible = new BehaviorSubject<Boolean>(false);
  figureArray = new BehaviorSubject<any[]>([]);
}
