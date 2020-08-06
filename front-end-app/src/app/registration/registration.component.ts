import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AuthenticateService} from "../service/authenticate/authenticate.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  registrationTitle = 'rejestracja';
  loginTitle = 'login'

  isLoginFormOpen: boolean = false;
  loginElementTextValue = 'logowanie';

  isRegistrationIndividualFormOpen: boolean = false;
  registrationIndividualElementTextValue = 'indywidualne';

  isRegistrationCommissionFormOpen: boolean = false;
  registrationCommissionElementTextValue = 'komis';

  isRegistrationBrokerFormOpen: boolean = false;
  registrationBrokerElementTextValue = 'dealer/broker';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticateS: AuthenticateService) {
  }

  ngOnInit(): void {
    if (this.authenticateS.isAuthenticate()) {
      this.router.navigate(['dashboard']);
    } else {
      if (this.router.url.endsWith("login")) {
        this.openLoginForm();
      } else if (this.router.url.endsWith("registration")) {
        this.closeAllForms();
      } else if (this.router.url.endsWith("registration/individual")) {
        this.openRegistrationIndividualForm();
      } else if (this.router.url.endsWith("registration/commission")) {
        this.openRegistrationCommissionForm();
      } else if (this.router.url.endsWith("registration/broker")) {
        this.openRegistrationBrokerForm();
      }
    }
  }

  closeAllForms(): void {
    this.isLoginFormOpen = false;
    this.isRegistrationIndividualFormOpen = false;
    this.isRegistrationCommissionFormOpen = false;
    this.isRegistrationBrokerFormOpen = false;
  }

  openLoginForm(): void {
    this.closeAllForms();
    this.isLoginFormOpen = true;
    if (!this.router.url.endsWith("login")) {
      this.redirectTo("login")
    }
  }

  openRegistrationIndividualForm(): void {
    this.closeAllForms();
    this.isRegistrationIndividualFormOpen = true;
    if (!this.router.url.endsWith("individual")) {
      this.redirectTo("registration/individual")

    }
  }

  openRegistrationCommissionForm(): void {
    this.closeAllForms();
    this.isRegistrationCommissionFormOpen = true;
    if (!this.router.url.endsWith("commission")) {
      this.redirectTo("registration/commission")
    }
  }

  openRegistrationBrokerForm(): void {
    this.closeAllForms();
    this.isRegistrationBrokerFormOpen = true;
    if (!this.router.url.endsWith("broker")) {
      this.redirectTo("registration/broker")
    }
  }

  redirectTo(path: string): void {
    this.router.navigate([path]);
  }
}
