import {Component, OnInit} from '@angular/core';
import {RegistrationFormValidationService} from "../../service/form/registration-form-validation.service";
import {AuthenticateService} from "../../service/authenticate/authenticate.service";
import {Router} from "@angular/router";
import {RolesModel} from "../../model/roles.model";
import {UserModel} from "../../model/user.model";

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
    private authenticateS: AuthenticateService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  verifyForm(): void {
    this.isEmailValid();
    this.isPasswordValid();
    this.isConfirmValid();
    this.isSecretWordValid();
    this.isRegulationAccept();
  }

  isFormValid(): boolean {
    return this.isEmailValid() && this.isPasswordValid() && this.isConfirmValid() && this.isSecretWordValid() && this.isRegulationAccept();
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

  isRegulationAccept(): boolean {
    this.invalidMsg.regulationAccept = 'Przed rejestracją należy zapoznać się z regulaminem serwisu i zaakceptować go';
    return this.value.isRegulationAccept;
  }

  registrationIndividualFormSubmit(): void {

    if (this.isFormValid()) {
      const user: UserModel = new UserModel();
      user.email = this.value.email.trim();
      user.password = this.value.password.trim();
      user.secretWord = this.value.secretWord.trim();
      user.roles = [RolesModel.UserRole, RolesModel.IndividualRole];
      user.isGoogleAuthenticate = false;
      user.isFBAuthenticate = false;

      this.authenticateS
        .isEmailExist(user.email)
        .subscribe(data => {
          if (data['success']) {
            this.isValid.email = false;
            this.invalidMsg.email = 'wybierz inny';
            this.value.password = '';
            this.value.confirm = '';
            return false;
          } else {
            this.authenticateS
              .registrationIndividual(user)
              .subscribe((data) => {
                this.startTimer();
                if (data['success']) {
                  this.isSuccess = true;
                  setTimeout(() => {
                    this.router.navigate(['login']);
                  }, 4000);
                } else {
                  this.isServerDontResponse = true;
                  setTimeout(() => {
                    this.isServerDontResponse = false;
                  }, 4000);
                }
              });
          }
        });
    } else {
      this.value.isRegulationAccept = false;
    }
  }

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
}
