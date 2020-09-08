import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostFormValidationService {

  constructor() {
  }

  isPostTitleValid(value: string): boolean {
    return value.length > 2;
  }

  isModelValid(value: Array<string>): boolean {
    for (let i = 0; i < value.length; ++i) {
      if (value[i].length <= 0) return false
    }
    return true;
  }

  isMarkValid(value: string) {
    return value.length > 0;

  }
}
