import {Component, OnInit} from '@angular/core';
import {RegistrationFormValidationService} from "../service/form/registration-form-validation.service";
import {AuthenticateService} from "../service/authenticate/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-login',
  templateUrl: './registration-login.component.html',
  styleUrls: ['./registration-login.component.css']
})

export class RegistrationLoginComponent implements OnInit {

  value = {
    email: '',
    password: '',
    isRemember: false,
  }
  isValid = {
    email: true,
    password: true,
  }

  invalidMsg = {
    email: '',
    password: '',
    remember: 'Wybierz tę opcję tylko wtedy, gdy ufasz temu komputerowi i przeglądarce',
  };

  constructor(
    private validation: RegistrationFormValidationService,
    private authenticateS: AuthenticateService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  authenticateIn() {
    this.verifyFormInput();
    this.value.isRemember = false;

    if (this.isFormValid()) {
      const user = {
        email: this.value.email.trim(),
        password: this.value.password.trim(),
      }
      this.authenticateS
        .verifyEmail(user.email)
        .subscribe(data => {
          if (data['success']) {
            this.authenticateS
              .authenticate(user)
              .subscribe(data => {
                if (data['success']) {
                  this.authenticateS.storeUser(data['token'], data['user'])
                  this.router.navigate(['']);
                } else {
                  this.isValid.email = false;
                  this.invalidMsg.email = 'Uwierzytelnianie nie powiodło się';
                  this.value.password = '';
                }
              });
          }
        });

    }

  }

  isFormValid(): boolean {
    return this.isEmailValid() && this.isPasswordValid();
  }

  verifyFormInput() {
    if (!this.isEmailValid()) {
      this.invalidMsg.email = 'jest nie prawidłowy';
    }
    if (!this.isPasswordValid()) {
      this.value.password = '';
      this.invalidMsg.password = 'musi zawierać co najmniej jedną wielką literę i cyfrę, a długość musi być większa niż 8';
    }
  }

  isEmailValid() {
    this.isValid.email = this.validation.isEmailValid(this.value.email.trim());
    return this.isValid.email;
  }

  isPasswordValid() {
    this.isValid.password = this.validation.isPasswordValid(this.value.password.trim());
    return this.isValid.password;
  }
}
