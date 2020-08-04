import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormValidationService {

  constructor() {
  }

  isEmailValid(value) {
    if (value === undefined) {
      return false;
    } else if (value === '') {
      return false;
    } else {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    }
  }

  isPasswordValid(value) {
    if (value === undefined) {
      return false;
    } else if (value === '') {
      return false;
    } else {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
      ;
    }
  }

  isPasswordConfirm(password, confirm) {
    if (this.isPasswordValid(confirm)) {
      return password === confirm;
    }
    return false;
  }

  isSecretWordValid(value) {
    if (value === undefined) {
      return false;
    } else if (value === '') {
      return false;
    } else {
      return true;
    }
  }
}
