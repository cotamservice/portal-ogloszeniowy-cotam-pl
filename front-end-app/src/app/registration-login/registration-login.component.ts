import {Component, OnInit} from '@angular/core';
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-registration-login',
  templateUrl: './registration-login.component.html',
  styleUrls: ['./registration-login.component.css']
})

export class RegistrationLoginComponent implements OnInit {
  inputEmailId = 'email';
  inputEmailLabelValue = 'Email';
  inputEmailPlaceholder = 'wprowadż swój email';

  inputPasswordId = 'password';
  inputPasswordLabelValue = 'Hasło';
  inputPasswordPlaceholder = 'wprowadż swoe hasło';

  inputRememberCheckboxId = 'remember';
  inputRememberCheckboxLabelValue = 'Zapamiętaj mnie'

  loginRemoteGoogleTitleValue = 'Zaloguj się przez google';
  loginRemoteFBTitleValue = 'Zaloguj się przez facebook';

  loginButtonTitleValue = 'Zaloguj się';
  forgotPasswordLinkValue = 'Zaponiałeś hasło?';

  constructor() {
  }

  ngOnInit(): void {
  }

}
