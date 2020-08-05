import {Component, OnInit} from '@angular/core';
import {RegistrationFormValidationService} from "../service/form/registration-form-validation.service";
import {AuthenticateService} from "../service/authenticate/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-individual',
  templateUrl: './registration-individual.component.html',
  styleUrls: ['./registration-individual.component.css']
})
export class RegistrationIndividualComponent implements OnInit {
  redirectTimer;
  redirectTimeLeft = 5;
  isSuccess: boolean;
  isServerDontResponse: boolean;

  value = {
    email: '',
    password: '',
    confirm: '',
    secretWord: '',
    isRegulationAccept: false,
  }

  isValid = {
    email: true,
    password: true,
    confirm: true,
    secretWord: true,
  }

  invalidMsg = {
    email: '',
    password: '',
    confirm: '',
    secretWord: '',
    regulationAccept: ''
  };

  constructor(
    private validation: RegistrationFormValidationService,
    private authenticate: AuthenticateService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  isFormValid(): boolean {
    return this.isValid.email && this.isValid.password && this.isValid.confirm && this.isValid.secretWord && this.value.isRegulationAccept;
  }

  isEmailValid() {
    this.isValid.email = this.validation.isEmailValid(this.value.email);
  }

  isPasswordValid() {
    this.isValid.password = this.validation.isPasswordValid(this.value.password);
  }

  isConfirmValid() {
    this.isValid.confirm = this.validation.isPasswordConfirm(this.value.password, this.value.confirm);
  }

  isSecretWordValid() {
    this.isValid.secretWord = this.validation.isSecretWordValid(this.value.secretWord);
  }

  registrationIndividualFormSubmit() {
    const form = {
      email: this.value.email,
      password: this.value.password,
      confirm: this.value.confirm,
      secretWord: this.value.secretWord,
      isRegulationNotAccept: this.value.isRegulationAccept,
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
      this.value.confirm = '';
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
    if (!this.value.isRegulationAccept) {
      this.invalidMsg.regulationAccept = 'Before registration u must read and accept service regulation';
    }

    if (this.isFormValid()) {
      this.authenticate
        .verifyEmail(form.email)
        .subscribe((data) => {
          let result = data['success'];
          if (result) {
            this.isValid.email = false;
            this.invalidMsg.email = 'choose other email';
            this.value.password = '';
            this.value.confirm = '';
            return false;
          } else {
            this.authenticate
              .registrationIndividual(form)
              .subscribe((data) => {
                this.startTimer();
                if (data['success']) {
                  this.isSuccess = true;
                  setTimeout(() => {
                    this.router.navigate(['login']);
                  }, 5000);  //5s
                } else {
                  this.isServerDontResponse = true;
                  setTimeout(() => {
                    this.isServerDontResponse = false;
                  }, 5000);  //5s
                }
              });
          }
        })
    }
  }

  startTimer() {
    this.redirectTimer = setInterval(() => {
      if (this.redirectTimeLeft > 0) {
        this.redirectTimeLeft--;
      } else {
        this.redirectTimeLeft = 5;
      }
    }, 1000)
  }
}
