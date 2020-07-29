import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-registration-commission',
  templateUrl: './registration-commission.component.html',
  styleUrls: ['./registration-commission.component.css']
})
export class RegistrationCommissionComponent implements OnInit {
  registrationButtonTitleValue = 'Zarejestruje się';

  inputEmailId = 'id';
  inputEmailLabelValue = 'Email';
  inputEmailPlaceholderValue = 'wpiś email';

  inputPasswordId = 'password';
  inputPasswordLabelValue = 'Hasło';
  inputPasswordPlaceholderValue = 'wpiś hasło';

  inputPasswordConfirmId = 'confirm';
  inputPasswordConfirmLabelValue = 'Powtóż hasło';
  inputPasswordConfirmPlaceholderValue = 'powtóż hasło';

  inputWordId = 'word';
  inputWordLabelValue = 'Słowo kluczowe';
  inputWordPlaceholderValue = 'wpiś słowo kluczowe';

  inputAcceptCheckboxId = 'accept';
  inputAcceptCheckboxTitleValue = 'Akceptuję regulamin serwisu';

  inputNipId= 'nip';
  inputNipLabelValue = 'NIP';
  inputNipPlaceholderValue = 'wpiś nip';

  inputCompanyNameId= 'company';
  inputCompanyNameLabelValue = 'Nazwa firmy';
  inputCompanyNamePlaceholderValue = 'wpiś pewną nazwe firmy';

  selectCompanyTypeId= 'type';
  selectCompanyTypeLabelValue = 'Forma prawna';
  inputCompanyTypePlaceholderValue = 'wpiś formę prawną';
  selectCompanyTypeDefaultValue = 'wybierz';
  selectCompanyOptionList = ['spółka', 'jednoosobowa'];

  inputNameId= 'name';
  inputNameLabelValue = 'Imię';
  inputNamePlaceholderValue = 'wpiś imię';

  inputSurnameId= 'surname';
  inputSurnameLabelValue = 'Nazwisko';
  inputSurnamePlaceholderValue = 'wpiś nazwisko';

  inputCountryId= 'country';
  inputCountryLabelValue = 'Kraj';
  inputCountryPlaceholderValue = 'wpiś kraj';

  inputAddressId= 'address';
  inputAddressLabelValue = 'Adres';
  inputAddressPlaceholderValue = 'wpiś addres';

  inputZipId= 'zip';
  inputZipLabelValue = 'Kod pocztowy';
  inputZipPlaceholderValue = 'wpiś kod pocztowy';

  inputCityId= 'city';
  inputCityLabelValue = 'Miasto';
  inputCityPlaceholderValue = 'wpiś miasto';

  inputPhoneId= 'phone';
  inputPhoneLabelValue = 'Telefon';
  inputPhonePlaceholderValue = 'wpiś telefon';

  generalInfoTitleValue = 'Podstawowa informacja';
  companyInfoTitleValue = 'Informacja o firmie';

  salonInfoTitleValue = 'Lokalizacja salonu';

  inputSalonNameId = 'salon-name';
  inputSalonNameLabelValue = 'Nazwa salonu';
  inputSalonNamePlaceholderValue = 'wpiś nazwę salonu';

  inputSalonCountryId = 'salon-country';
  inputSalonCountryLabelValue = 'Kraj';
  inputSalonCountryPlaceholderValue = 'wpiś kraju';

  inputSalonAddressId = 'salon-address';
  inputSalonAddressLabelValue = 'Adres';
  inputSalonAddressPlaceholderValue = 'wpiś adres';

  inputSalonZipId = 'salon-zip';
  inputSalonZipLabelValue = 'Kod pocztowy';
  inputSalonZipPlaceholderValue = 'wpiś kod pocztowy';

  inputSalonCityId = 'salon-city';
  inputSalonCityLabelValue = 'Miasto';
  inputSalonCityPlaceholderValue = 'wpiś miasto';

  inputSalonPhoneId = 'salon-phone';
  inputSalonPhone2Id = 'salon-phone2';
  inputSalonPhoneLabelValue = 'Telefon';
  inputSalonPhonePlaceholderValue = 'wpiś telefon';

  constructor() {
  }

  ngOnInit(): void {
  }

}
