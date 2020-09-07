import {Component, OnInit,NgZone} from '@angular/core';
import {AuthenticateService} from "../../service/authenticate/authenticate.service";
import {UserModel} from "../../model/user.model";
import {Router} from "@angular/router";
import {RolesModel} from "../../model/roles.model";
/// <reference path="../../../../node_modules/@types/gapi/index.d.ts" />
declare var gapi: any;

@Component({
  selector: 'app-registration-login-google',
  templateUrl: './registration-login-google.component.html',
  styleUrls: ['./registration-login-google.component.css']
})

export class RegistrationLoginGoogleComponent implements OnInit {


  constructor(private router: Router,
              private ngZone: NgZone,
              private authenticateS: AuthenticateService) {
  }

  ngOnInit() {

  }

  authenticateIn(): void {
    gapi.load('auth2', () => {
      let params = {
        client_id: '216771643471-695lth4b4nhl4qmqiqmjpkodtdfgpefb.apps.googleusercontent.com',
        scope: ['profile', 'email'].join(" "),
      };
      gapi.auth2.init(params)
        .then((googleAuth) => {
          googleAuth.signIn().then((googleUser) => {
            const googleEmail = googleUser.getBasicProfile().getEmail();
            const googleId = googleUser.getBasicProfile().getId();
            this.authenticateS.authenticateByFbGo(googleEmail, googleId,true,false);
          });

        });
    });
  }
}
