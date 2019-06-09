import { convertToParamMap, ParamMap, Params, Data } from '@angular/router';
import { of, Observable, ReplaySubject } from 'rxjs';

import { Person } from '../app/Classes/person';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();
  data: Observable<Data>;

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  }

  /** Set the data observable's value */
  setData(data?: Person) {
    this.data = of(data);
  }
}
