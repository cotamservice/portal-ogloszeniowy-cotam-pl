import {Component, OnInit} from '@angular/core';
import {RegistrationFormValidationService} from "../registration-form-validation.service";

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

  email: string;
  password: string;
  confirm: string;
  secretWord: string;
  isRegulationAccept: boolean;

  constructor(private validation: RegistrationFormValidationService) {
  }

  ngOnInit(): void {
  }

  registrationIndividualFormSubmit() {
    const user = {
      email: this.email,
      password: this.password,
      confirm: this.confirm,
      secretWord: this.secretWord,
      isRegulationAccept: this.isRegulationAccept,
    }

    if(this.validation.isEmailValid(user.email)){
      console.log('email is valid');
    }else{
      console.log('email is not valid');
      return false;
    }
    if(this.validation.isPasswordConfirm(user.password, user.confirm)){
      console.log('password confirm');
    }else{
      console.log('password not confirm');
      return false;
    }

  }
}
