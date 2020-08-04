import {Component, OnInit} from '@angular/core';
import {RegistrationFormValidationService} from "../service/form/registration-form-validation.service";

@Component({
  selector: 'app-registration-individual',
  templateUrl: './registration-individual.component.html',
  styleUrls: ['./registration-individual.component.css']
})
export class RegistrationIndividualComponent implements OnInit {
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

  value = {
    email: '',
    password: '',
    confirm: '',
    secretWord: '',
    isRegulationAccept: false
  }

  isValid = {
    email: true,
    password: true,
    confirm: true,
    secretWord: true,
    isRegulationAccept: false
  }

  invalidMsg = {
    email: '',
    password: '',
    confirm: '',
    secretWord: '',
    regulationAccept: ''
  };

  constructor(private validation: RegistrationFormValidationService) {

  }

  ngOnInit(): void {
  }

  registrationIndividualFormSubmit() {
    const form = {
      email: this.value.email,
      password: this.value.password,
      confirm: this.value.confirm,
      secretWord: this.value.secretWord,
      isRegulationAccept: this.value.isRegulationAccept,
    }

    this.isValid.email = this.validation.isEmailValid(form.email);
    this.isValid.password = this.validation.isPasswordValid(form.password);
    this.isValid.confirm = this.validation.isPasswordConfirm(form.password, form.confirm);
    this.isValid.secretWord = this.validation.isSecretWordValid(form.secretWord);

    if (!this.isValid.email) {
      this.invalidMsg.email = 'email is invalid';
    }
    if (!this.isValid.password) {
      this.value.password = '';
      this.invalidMsg.password = 'Password must consist at least one Uppercase and number and length more then 8'
    }
    if (!this.isValid.confirm) {
      this.value.password = '';
      this.value.confirm = '';
      this.invalidMsg.confirm = 'Invalid password confirm';
    }
    if (!this.isValid.secretWord) {
      this.invalidMsg.secretWord = 'Secret must exist';
    }
    if (!this.isValid.isRegulationAccept) {
      this.invalidMsg.regulationAccept = 'Before registration u must read and accept service regulation';
    }
  }
}
