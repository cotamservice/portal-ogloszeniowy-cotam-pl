import {Injectable} from '@angular/core';
import {count} from "rxjs/operators";

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
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
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

  isCompanyNipValid(nip: string) {
    return /^[0-9]{10}$/.test(nip);
  }

  isCompanyNameValid(name: string) {
    return name.length > 2;
  }

  isCompanyPersonNameValid(name: string) {
    return name.length > 2;
  }

  isCompanyPersonSurnameValid(surname: string) {
    return surname.length > 2;
  }

  isCountryValid(country: string) {
    return country.length > 2;
  }

  isAddressValid(address: string) {
    return address.length > 2;
  }

  isZipValid(zip: string) {
    return zip.length > 3;
  }

  isCityValid(city: string) {
    return city.length > 2;
  }

  isPhoneValid(phone: string) {
    return /^[+]?[0-9, ]+$/.test(phone);
  }

  isSalonNameValid(name: string) {
    return name.length > 2;
  }
}
