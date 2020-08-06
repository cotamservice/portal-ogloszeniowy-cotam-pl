import {Component, OnInit} from '@angular/core';
import {RegistrationFormValidationService} from "../service/form/registration-form-validation.service";
import {AuthenticateService} from "../service/authenticate/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private validation: RegistrationFormValidationService,
    private authenticateS: AuthenticateService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  authenticateOut() {
    this.authenticateS.authenticateOut();
    this.router.navigate(['login']);
    return false;
  }
}
