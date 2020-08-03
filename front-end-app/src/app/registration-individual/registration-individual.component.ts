import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-registration-individual',
  templateUrl: './registration-individual.component.html',
  styleUrls: ['./registration-individual.component.css']
})
export class RegistrationIndividualComponent implements OnInit {
  registrationButtonTitleValue = 'Zarejestruje się';

  inputEmailId='id';
  inputEmailLabelValue='Email';
  inputEmailPlaceholderValue='wpiś email';

  inputPasswordId='password';
  inputPasswordLabelValue='Hasło';
  inputPasswordPlaceholderValue='wpiś hasło';

  inputPasswordConfirmId='confirm';
  inputPasswordConfirmLabelValue='Powtóż hasło';
  inputPasswordConfirmPlaceholderValue='powtóż hasło';

  inputWordId='word';
  inputWordLabelValue='Słowo kluczowe';
  inputWordPlaceholderValue='wpiś słowo kluczowe';

  inputAcceptCheckboxId = 'accept';
  inputAcceptCheckboxTitleValue = 'Akceptuję regulamin serwisu';

  constructor() {
  }

  ngOnInit(): void {
  }

  registrationIndividualFormSubmit() {
    console.log('registration individual form click submit')
  }
}
