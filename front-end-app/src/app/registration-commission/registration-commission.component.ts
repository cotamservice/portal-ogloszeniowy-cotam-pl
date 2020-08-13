import {Component, OnInit} from '@angular/core';
import {RegistrationFormValidationService} from "../service/form/registration-form-validation.service";
import {AuthenticateService} from "../service/authenticate/authenticate.service";
import {Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {RolesModel} from "../model/roles.model";

@Component({
  selector: 'app-registration-commission',
  templateUrl: './registration-commission.component.html',
  styleUrls: ['./registration-commission.component.css']
})
export class RegistrationCommissionComponent implements OnInit {
  isSuccess: boolean;
  isServerDontResponse: boolean;

  value = {
    email: '',
    password: '',
    confirm: '',
    secretWord: '',
    isRegulationAccept: false,
    selectCompanyOptionList: ['spółka', 'jednoosobowa'],
    companyNip: '',
    companyName: '',
    companyType: '',
    companyPersonName: '',
    companyPersonSurname: '',
    companyCountry: '',
    companyAddress: '',
    companyZip: '',
    companyCity: '',
    companyPhone: '',
    salonName: '',
    salonCountry: '',
    salonAddress: '',
    salonZip: '',
    salonCity: '',
    salonPhone1: '',
    salonPhone2: '',
  }

  isValid = {
    email: true,
    password: true,
    confirm: true,
    secretWord: true,
    companyNip: true,
    companyName: true,
    companyType: true,
    companyPersonName: true,
    companyPersonSurname: true,
    companyCountry: true,
    companyAddress: true,
    companyZip: true,
    companyCity: true,
    companyPhone: true,
    salonName: true,
    salonCountry: true,
    salonAddress: true,
    salonZip: true,
    salonCity: true,
    salonPhone1: true,
    salonPhone2: true,
  }

  invalidMsg = {
    email: '',
    password: '',
    confirm: '',
    secretWord: '',
    regulationAccept: '',
    companyNip: '',
    companyName: '',
    companyType: '',
    companyPersonName: '',
    companyPersonSurname: '',
    companyCountry: '',
    companyAddress: '',
    companyZip: '',
    companyCity: '',
    companyPhone: '',
    salonName: '',
    salonCountry: '',
    salonAddress: '',
    salonZip: '',
    salonCity: '',
    salonPhone1: '',
    salonPhone2: '',
  };

  constructor(private validation: RegistrationFormValidationService,
              private authenticateS: AuthenticateService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  isEmailValid(): boolean {
    this.isValid.email = this.validation.isEmailValid(this.value.email.trim());
    this.invalidMsg.email = 'jest nie prawidłowy';
    return this.isValid.email;
  }

  isPasswordValid(): boolean {
    this.isValid.password = this.validation.isPasswordValid(this.value.password.trim());
    this.invalidMsg.password = 'musi zawierać co najmniej jedną wielką literę i cyfrę, a długość musi być większa niż 8';
    return this.isValid.password;
  }

  isConfirmValid(): boolean {
    this.isValid.confirm = this.validation.isPasswordConfirm(this.value.password.trim(), this.value.confirm.trim());
    this.invalidMsg.confirm = 'nieprawidłowe';
    return this.isValid.confirm;
  }

  isSecretWordValid(): boolean {
    this.isValid.secretWord = this.validation.isSecretWordValid(this.value.secretWord.trim());
    this.invalidMsg.secretWord = 'musi istnieć';
    return this.isValid.secretWord;
  }


  isCompanyNipValid() {
    this.isValid.companyNip = this.validation.isCompanyNipValid(this.value.companyNip.trim());
    this.invalidMsg.companyNip = 'nie prawidłowy nip';
    return this.isValid.companyNip;
  }

  isCompanyNameValid() {
    this.isValid.companyName = this.validation.isCompanyNameValid(this.value.companyName.trim());
    this.invalidMsg.companyName = 'nie prawidłowa wartość';
    return this.isValid.companyName;
  }

  isCompanyTypeValid() {
    // this.isValid.companyName = this.validation.isCompanyNameValid(this.value.companyName.trim());
    // this.invalidMsg.companyName = 'wybierz formę prawną';
    console.log("SELECT VALUE: " + this.value.companyType);
    // return this.isValid.companyType;
    return false;
  }

  isCompanyPersonNameValid() {
    this.isValid.companyPersonName = this.validation.isCompanyPersonNameValid(this.value.companyPersonName.trim());
    this.invalidMsg.companyPersonName = 'nie prawidłowa wartość';
    return this.isValid.companyPersonName;
  }

  isCompanyPersonSurnameValid() {
    this.isValid.companyPersonSurname = this.validation.isCompanyPersonSurnameValid(this.value.companyPersonSurname.trim());
    this.invalidMsg.companyPersonSurname = 'nie prawidłowa wartość';
    return this.isValid.companyPersonSurname;

  }

  isCompanyCountryValid() {
    this.isValid.companyCountry = this.validation.isCountryValid(this.value.companyCountry.trim());
    this.invalidMsg.companyCountry = 'nie prawidłowa wartość';
    // return this.isValid.companyCountry;
    return false;
  }

  isCompanyAddressValid() {
    this.isValid.companyAddress = this.validation.isAddressValid(this.value.companyAddress.trim());
    this.invalidMsg.companyAddress = 'nie prawidłowa wartość';
    return this.isValid.companyAddress;
  }

  isCompanyZipValid() {
    this.isValid.companyZip = this.validation.isZipValid(this.value.companyZip.trim());
    this.invalidMsg.companyZip = 'nie prawidłowa wartość';
    return this.isValid.companyZip;
  }

  isCompanyCityValid() {
    this.isValid.companyCity = this.validation.isCityValid(this.value.companyCity.trim());
    this.invalidMsg.companyCity = 'nie prawidłowa wartość';
    return this.isValid.companyCity;
  }

  isCompanyPhoneValid() {
    this.isValid.companyPhone = this.validation.isPhoneValid(this.value.companyPhone.trim());
    this.invalidMsg.companyAddress = 'musi zawierać tylko cyfry z lub bez dodanym "+" na początku';
    return this.isValid.companyPhone;
  }

  isSalonNameValid() {
    this.isValid.salonName = this.validation.isSalonNameValid(this.value.salonName.trim());
    this.invalidMsg.salonName = 'nie prawidłowa wartość';
    return this.isValid.salonName;
  }

  isSalonCountryValid() {
    this.isValid.salonCountry = this.validation.isCountryValid(this.value.salonCountry.trim());
    this.invalidMsg.salonCountry = 'nie prawidłowa wartość';
    return this.isValid.salonCountry;
  }

  isSalonAddressValid() {
    this.isValid.salonAddress = this.validation.isAddressValid(this.value.salonAddress.trim());
    this.invalidMsg.salonAddress = 'nie prawidłowa wartość';
    return this.isValid.salonAddress;
  }

  isSalonCityValid() {
    this.isValid.salonCity = this.validation.isCityValid(this.value.salonCity.trim());
    this.invalidMsg.salonCity = 'nie prawidłowa wartość';
    return this.isValid.salonCity;
  }

  isSalonZipValid() {
    this.isValid.salonZip = this.validation.isZipValid(this.value.salonZip.trim());
    this.invalidMsg.salonZip = 'nie prawidłowa wartość';
    return this.isValid.salonZip;
  }

  isSalonPhone1Valid() {
    this.isValid.salonPhone1 = this.validation.isPhoneValid(this.value.salonPhone1.trim());
    this.invalidMsg.salonPhone1 = 'nie prawidłowa wartość';
    return this.isValid.salonPhone1;
  }

  isSalonPhone2Valid() {
    this.isValid.salonPhone2 = this.validation.isPhoneValid(this.value.salonPhone2.trim());
    this.invalidMsg.salonPhone2 = 'nie prawidłowa wartość';
    return this.isValid.salonPhone2;
  }

  isRegulationAccept(): boolean {
    this.invalidMsg.regulationAccept = 'Przed rejestracją należy zapoznać się z regulaminem serwisu i zaakceptować go';
    return this.value.isRegulationAccept;
  }

  isFormValid(): boolean {
    return this.isEmailValid() && this.isPasswordValid() && this.isConfirmValid() && this.isSecretWordValid()
      && this.isCompanyAddressValid() && this.isCompanyCityValid() && this.isCompanyCountryValid() && this.isCompanyNameValid()
      && this.isCompanyNipValid() && this.isCompanyPersonNameValid() && this.isCompanyPersonSurnameValid() && this.isCompanyPhoneValid()
      && this.isCompanyTypeValid() && this.isCompanyZipValid()
      && this.isSalonAddressValid() && this.isSalonCityValid() && this.isSalonCountryValid() && this.isSalonNameValid()
      && this.isSalonPhone1Valid() && this.isSalonPhone2Valid() && this.isSalonZipValid()
      && this.isRegulationAccept();
  }

  redirectTimer;
  redirectTimeLeft = 5;

  startTimer(): void {
    this.redirectTimer = setInterval(() => {
      if (this.redirectTimeLeft > 0) {
        this.redirectTimeLeft--;
      } else {
        this.redirectTimeLeft = 5;
        clearInterval(this.redirectTimer);
      }
    }, 1000)
  }

  registrationIndividualFormSubmit() {
    if (this.isFormValid()) {
      const user: UserModel = new UserModel();
      user.email = this.value.email.trim();
      user.password = this.value.password.trim();
      user.secretWord = this.value.secretWord.trim();
      user.roles = [RolesModel.UserRole, RolesModel.CommissionRole];
      user.isGoogleAuthenticate = false;
      user.isFBAuthenticate = false;
      console.log(user);

    } else {
      this.value.isRegulationAccept = false;
    }
  }
}
