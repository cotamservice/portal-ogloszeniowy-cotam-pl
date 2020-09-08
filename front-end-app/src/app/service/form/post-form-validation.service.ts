import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostFormValidationService {

  constructor() {
  }

  isPostTitleValid(title: string): boolean {
    return title.length > 2;
  }
}
