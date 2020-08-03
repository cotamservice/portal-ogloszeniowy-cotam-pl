import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

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

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    if (this.router.url.endsWith("login")) {
      this.openLoginForm();
    } else if (this.router.url.endsWith("registration")) {
      this.openRegistrationIndividualForm();
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
    this.redirectTo('login');
  }

  openRegistrationIndividualForm(): void {
    this.closeAllForms();
    this.isRegistrationIndividualFormOpen = true;
    this.redirectTo('registration');
  }

  openRegistrationCommissionForm(): void {
    this.closeAllForms();
    this.isRegistrationCommissionFormOpen = true;
    this.redirectTo('registration');
  }

  openRegistrationBrokerForm(): void {
    this.closeAllForms();
    this.isRegistrationBrokerFormOpen = true;
    this.redirectTo('registration');
  }

  redirectTo(pagename: string): void {
    this.router.navigate(['/' + pagename]);
  }
}
