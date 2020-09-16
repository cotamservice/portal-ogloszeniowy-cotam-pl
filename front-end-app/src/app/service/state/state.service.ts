import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() {
  }

  getStates(): Array<Array<string>> {
    let result = [];
    return result;
  }
}
