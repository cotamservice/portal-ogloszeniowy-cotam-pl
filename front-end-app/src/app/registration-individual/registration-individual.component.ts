import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  registrationIndividualFormSubmit() {
    console.log('email :' + this.email );
    console.log('password :' + this.password );
    console.log('confirm :' + this.confirm );
    console.log('secret word :' + this.secretWord );
    console.log('is accepted :' + this.isRegulationAccept );

  }
}
