import {Component, OnInit} from '@angular/core';
import {RegistrationFormValidationService} from "../service/form/registration-form-validation.service";
import {AuthenticateService} from "../service/authenticate/authenticate.service";
import {Router} from "@angular/router";
import {UserModel} from "../model/user.model";
import {RolesModel} from "../model/roles.model";
import {CompanyTypeModel} from "../model/company.type.model";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {GusService} from "../service/gus/gus.service";
import {CountryService} from "../service/country/country.service";
import {CompanyModel} from "../model/company.model";
import {SalonModel} from "../model/salon.model";

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
    selectCompanyOptionList: Object.values(CompanyTypeModel),
    companyNip: '',
    companyNipEU: '',
    hasNipEu: false,
    companyName: '',
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
    isNotPolandCompany: false,

  }

  isValid = {
    email: true,
    password: true,
    confirm: true,
    secretWord: true,
    companyNip: true,
    companyNipEU: true,
    companyName: true,
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
    hasNipEu: true,
  }

  invalidMsg = {
    email: '',
    password: '',
    confirm: '',
    secretWord: '',
    regulationAccept: '',
    companyNip: '',
    companyNipEU: '',
    companyName: '',
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
              private http: HttpClient,
              private gus: GusService,
              private countryS: CountryService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  getAllCountriesCodeAndName() {
    let result = [];
    for (let code in this.countryS.getIsoCountries()) {
      let name = this.countryS.getIsoCountries()[code]['name'];
      result.push([code, name]);
    }
    return result;
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

  isCompanyNipValid(): boolean {
    this.isValid.companyNip = this.validation.isCompanyNipValid(this.value.companyNip.trim());
    this.invalidMsg.companyNip = 'nie prawidłowy nip';
    return this.isValid.companyNip;
  }

  isCompanyNipEUValid() {
    this.isValid.companyNipEU = this.validation.isCompanyNipEuValid(this.value.companyNipEU.trim());
    this.invalidMsg.companyNipEU = 'nie prawidłowy nip';
    return this.value.hasNipEu && this.isValid.hasNipEu;
  }

  isCompanyNameValid(): boolean {
    this.isValid.companyName = this.validation.isCompanyNameValid(this.value.companyName.trim());
    this.invalidMsg.companyName = 'nie prawidłowa wartość';
    return this.isValid.companyName;
  }

  isCompanyPersonNameValid(): boolean {
    this.isValid.companyPersonName = this.validation.isCompanyPersonNameValid(this.value.companyPersonName.trim());
    this.invalidMsg.companyPersonName = 'nie prawidłowa wartość';
    return this.isValid.companyPersonName;
  }

  isCompanyPersonSurnameValid(): boolean {
    this.isValid.companyPersonSurname = this.validation.isCompanyPersonSurnameValid(this.value.companyPersonSurname.trim());
    this.invalidMsg.companyPersonSurname = 'nie prawidłowa wartość';
    return this.isValid.companyPersonSurname;

  }

  isCompanyCountryValid(): boolean {
    this.isValid.companyCountry = this.validation.isCountryValid(this.value.companyCountry.trim());
    this.invalidMsg.companyCountry = 'nie prawidłowa wartość';
    return this.isValid.companyCountry;
  }

  isCompanyAddressValid(): boolean {
    this.isValid.companyAddress = this.validation.isAddressValid(this.value.companyAddress.trim());
    this.invalidMsg.companyAddress = 'nie prawidłowa wartość';
    return this.isValid.companyAddress;
  }

  isCompanyZipValid(): boolean {
    this.isValid.companyZip = this.validation.isZipValid(this.value.companyZip.trim());
    this.invalidMsg.companyZip = 'nie prawidłowa wartość';
    return this.isValid.companyZip;
  }

  isCompanyCityValid(): boolean {
    this.isValid.companyCity = this.validation.isCityValid(this.value.companyCity.trim());
    this.invalidMsg.companyCity = 'nie prawidłowa wartość';
    return this.isValid.companyCity;
  }

  isCompanyPhoneValid(): boolean {
    this.isValid.companyPhone = this.validation.isPhoneValid(this.value.companyPhone.trim());
    this.invalidMsg.companyPhone = 'musi zawierać tylko cyfry z/bez dodanym "+" na początku';
    return this.isValid.companyPhone;
  }

  isSalonNameValid(): boolean {
    this.isValid.salonName = this.validation.isSalonNameValid(this.value.salonName.trim());
    this.invalidMsg.salonName = 'nie prawidłowa wartość';
    return this.isValid.salonName;
  }

  isSalonCountryValid(): boolean {
    this.isValid.salonCountry = this.validation.isCountryValid(this.value.salonCountry.trim());
    this.invalidMsg.salonCountry = 'nie prawidłowa wartość';
    return this.isValid.salonCountry;
  }

  isSalonAddressValid(): boolean {
    this.isValid.salonAddress = this.validation.isAddressValid(this.value.salonAddress.trim());
    this.invalidMsg.salonAddress = 'nie prawidłowa wartość';
    return this.isValid.salonAddress;
  }

  isSalonCityValid(): boolean {
    this.isValid.salonCity = this.validation.isCityValid(this.value.salonCity.trim());
    this.invalidMsg.salonCity = 'nie prawidłowa wartość';
    return this.isValid.salonCity;
  }

  isSalonZipValid(): boolean {
    this.isValid.salonZip = this.validation.isZipValid(this.value.salonZip.trim());
    this.invalidMsg.salonZip = 'nie prawidłowa wartość';
    return this.isValid.salonZip;
  }

  isSalonPhone1Valid(): boolean {
    this.isValid.salonPhone1 = this.validation.isPhoneValid(this.value.salonPhone1.trim());
    this.invalidMsg.salonPhone1 = 'nie prawidłowa wartość';
    return this.isValid.salonPhone1;
  }

  isSalonPhone2Valid(): boolean {
    this.isValid.salonPhone2 = this.validation.isPhoneValid(this.value.salonPhone2.trim());
    this.invalidMsg.salonPhone2 = 'nie prawidłowa wartość';
    return this.isValid.salonPhone2;
  }

  isRegulationAccept(): boolean {
    this.invalidMsg.regulationAccept = 'Przed rejestracją należy zapoznać się z regulaminem serwisu i zaakceptować go';
    return this.value.isRegulationAccept;
  }

  verifyForm(): void {
    this.isEmailValid();
    this.isPasswordValid();
    this.isConfirmValid();
    this.isSecretWordValid();
    this.isCompanyAddressValid();
    this.isCompanyCityValid();
    this.isCompanyCountryValid();
    this.isCompanyNameValid();
    this.isCompanyNipValid();
    this.isCompanyNipEUValid();
    this.isCompanyPersonNameValid();
    this.isCompanyPersonSurnameValid();
    this.isCompanyPhoneValid();
    this.isCompanyZipValid();
    this.isSalonAddressValid();
    this.isSalonCityValid();
    this.isSalonCountryValid();
    this.isSalonNameValid();
    this.isSalonPhone1Valid();
    this.isSalonPhone2Valid();
    this.isSalonZipValid();
    this.isRegulationAccept();
  }

  isFormValid(): boolean {
    return this.isEmailValid() && this.isPasswordValid() && this.isConfirmValid() && this.isSecretWordValid()
      && this.isCompanyAddressValid() && this.isCompanyCityValid() && this.isCompanyCountryValid() && this.isCompanyNameValid()
      && this.isCompanyNipValid() && this.isCompanyPersonNameValid() && this.isCompanyPersonSurnameValid() && this.isCompanyPhoneValid()
      && this.isCompanyZipValid() && this.isSalonAddressValid() && this.isSalonCityValid() && this.isSalonCountryValid() && this.isSalonNameValid()
      && this.isSalonPhone1Valid() && this.isSalonPhone2Valid() && this.isSalonZipValid()
      && this.isRegulationAccept() && this.isCompanyNipEUValid();
  }

  getCompanyInfoByNip() {
    if (this.value.isNotPolandCompany) return;
    let companyData = {
      nip: this.value.companyNip,
    };
    this.gus.getInfo(companyData, (companyData) => {
      if (companyData !== null && companyData['success'] && !companyData['data'][0]["ErrorCode"]) {
        let result = {
          success: companyData['success'],
          company: companyData['data'][0],
        }
        let company = result.company;
        this.isValid.companyNip = true;
        this.value.companyName = company['Nazwa'].toString();
        this.isValid.companyName = true;
        this.value.companyCountry = 'PL';
        this.isValid.companyCountry = true;
        this.value.companyAddress = [company['Ulica'].toString(), 'nr ' + company['NrNieruchomosci'].toString(), 'lok. ' + company['NrLokalu'].toString()].join(', ');
        this.isValid.companyAddress = true;
        this.value.companyZip = company ['KodPocztowy'].toString();
        this.isValid.companyZip = true;
        this.value.companyCity = company['Miejscowosc'].toString();
        this.isValid.companyCity = true;
      } else {
        this.value.companyName = '';
        this.value.companyCountry = '';
        this.value.companyAddress = '';
        this.value.companyZip = '';
        this.value.companyCity = '';
        this.verifyForm();
        this.isValid.companyNip = false;
        this.invalidMsg.companyNip = 'NIP nie istnieje';
      }
    });
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
    this.verifyForm();
    if (this.isFormValid()) {
      console.log('FORM VALID');
      const user: UserModel = new UserModel();
      user.email = this.value.email.trim();
      user.password = this.value.password.trim();
      user.secretWord = this.value.secretWord.trim();
      user.roles = [RolesModel.UserRole, RolesModel.CommissionRole];
      user.isGoogleAuthenticate = false;
      user.isFBAuthenticate = false;
      console.log("USER: " + user);

      const company: CompanyModel = new CompanyModel();
      company.nip = this.value.companyNip;
      company.nipEu = this.value.hasNipEu ? this.value.companyNipEU : '';
      company.name = this.value.companyName;
      company.country = this.value.companyCountry;
      company.address = this.value.companyAddress;
      company.zip = this.value.companyZip;
      company.city = this.value.companyCity;
      company.personName = this.value.companyPersonName;
      company.personSurname = this.value.companyPersonSurname;
      company.phone = this.value.companyPhone;
      company.creatorId = '';
      console.log("COMPANY: " + company);

      const salon: SalonModel = new SalonModel();
      salon.name = this.value.salonName;
      salon.country = this.value.salonCountry;
      salon.address = this.value.salonAddress;
      salon.city = this.value.salonCity;
      salon.phones = [this.value.salonPhone1, this.value.salonPhone2];
      salon.creatorId = '';
      console.log("SALON: " + salon);

    } else {
      this.value.isRegulationAccept = false;
    }
  }

  clearCompanyData() {
    this.value.companyName = '';
    this.value.companyCountry = '';
    this.value.companyAddress = '';
    this.value.companyZip = '';
    this.value.companyCity = '';
  }

}
