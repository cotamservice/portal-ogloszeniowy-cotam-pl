import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormValidationService {

  constructor() {
  }

  isEmailValid(value): boolean {
    if (value === undefined) {
      return false;
    } else if (value === '') {
      return false;
    } else {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    }
  }

  isPasswordValid(value): boolean {
    if (value === undefined) {
      return false;
    } else if (value === '') {
      return false;
    } else {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
      ;
    }
  }

  isPasswordConfirm(password, confirm): boolean {
    if (this.isPasswordValid(confirm)) {
      return password === confirm;
    }
    return false;
  }

  isSecretWordValid(value): boolean {
    if (value === undefined) {
      return false;
    } else if (value === '') {
      return false;
    } else {
      return true;
    }
  }

  isCompanyNipValid(nip: string): boolean {
    return /^[0-9]{3,}$/.test(nip);
  }

  isCompanyNipEuValid(nipeu: string) {
    return /^[a-zA-Z]{2,}[0-9]{3,}$/.test(nipeu);
  }
  isCompanyNameValid(name: string): boolean {
    return name.length > 2;
  }

  isCompanyPersonNameValid(name: string): boolean {
    return name.length > 2;
  }

  isCompanyPersonSurnameValid(surname: string): boolean {
    return surname.length > 2;
  }

  isCountryValid(country: string): boolean {
    return country.length > 0;
  }

  isAddressValid(address: string): boolean {
    return address.length > 2;
  }

  isZipValid(zip: string): boolean {
    return zip.length > 3;
  }

  isCityValid(city: string): boolean {
    return city.length > 2;
  }

  isPhoneValid(phone: string): boolean {
    return /^[+]?[0-9, ]+$/.test(phone);
  }

  isSalonNameValid(name: string): boolean {
    return name.length > 2;
  }

}
